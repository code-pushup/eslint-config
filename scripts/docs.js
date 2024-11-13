import { ESLint } from 'eslint';
import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  configExtraPattern,
  configPattern,
  configs,
  getConfigExtends,
  isConfigForTests,
} from './helpers/configs.js';
import { configRulesToMarkdown } from './helpers/format-config.js';
import { configsToMarkdown } from './helpers/format-readme.js';
import { getEnabledRuleIds, ruleLevelFromEntry } from './helpers/rules.js';

const currentDir = fileURLToPath(dirname(import.meta.url));
const readmePath = path.join(currentDir, '..', 'README.md');
const docsDir = path.join(currentDir, '..', 'docs');

await generateDocs();

async function generateDocs() {
  execSync('npm link');
  execSync('npm link @code-pushup/eslint-config');

  try {
    const peerDeps = await loadPeerDependencies();

    await fs.mkdir(docsDir, { recursive: true });

    for (const config of configs) {
      await generateConfigDocs(config, peerDeps);
    }

    await generateReadmeDocs(peerDeps);
  } finally {
    execSync('npm unlink @code-pushup/eslint-config');
  }
}

async function loadPeerDependencies() {
  const packageJson = require('../package.json');

  /** @type {Record<string, string[]>} */
  const pkgConfigs = {};

  for (const config of configs) {
    const eslint = new ESLint({
      baseConfig: { extends: `@code-pushup/eslint-config/legacy/${config}.js` },
      useEslintrc: false,
    });
    /** @type {import('eslint').Linter.Config} */
    const eslintConfig = await eslint.calculateConfigForFile(
      configPattern(config),
    );

    /** @type {import('eslint').Linter.Config | null} */
    const eslintConfigExtra = configExtraPattern(config)
      ? await eslint.calculateConfigForFile(configExtraPattern(config))
      : null;

    for (const pkg in packageJson.peerDependencies) {
      if (pkg === 'eslint') {
        continue;
      }
      const plugins = [
        ...(eslintConfig.plugins ?? []),
        ...(eslintConfigExtra?.plugins ?? []),
      ];
      const parsers = [
        ...(eslintConfig.parser ? [eslintConfig.parser] : []),
        ...(eslintConfigExtra?.parser ? [eslintConfigExtra.parser] : []),
      ];
      if (
        plugins.includes(pkg) ||
        plugins.includes(
          pkg.replace(/eslint-plugin-?/, '').replace(/\/$/, ''),
        ) ||
        parsers.some(parser => parser.includes(pkg))
      ) {
        pkgConfigs[pkg] ??= [];
        pkgConfigs[pkg].push(config);
      }
    }
  }

  return Object.entries(packageJson.peerDependencies).map(([pkg, version]) => ({
    pkg,
    version,
    optional: packageJson.peerDependenciesMeta[pkg]?.optional ?? false,
    usedByConfigs: pkgConfigs[pkg] ?? [],
  }));
}

/**
 * Update auto-generated part of README.md
 * @param {import('./helpers/types').PeerDep[]} peerDeps Peer dependencies
 */
async function generateReadmeDocs(peerDeps) {
  const extended = Object.fromEntries(
    configs.map(config => [
      config,
      getConfigExtends(config).filter(alias =>
        alias.startsWith('@code-pushup'),
      ),
    ]),
  );

  const buffer = await fs.readFile(readmePath);
  const mdPrevious = buffer.toString('utf8');

  const startComment = '<!-- begin autogenerated -->';
  const endComment = '<!-- end autogenerated -->';

  const startIndex = mdPrevious.indexOf(startComment);
  const endIndex = mdPrevious.indexOf(
    endComment,
    startIndex + startComment.length,
  );

  const mdGenerated = configsToMarkdown(configs, peerDeps, extended);
  const mdGeneratedBlock = [
    startComment,
    mdGenerated.replace(/\n$/, ''),
    endComment,
  ].join('\n\n');

  const mdUpdated =
    startIndex < 0
      ? [mdPrevious, mdGeneratedBlock].join('\n')
      : [
          mdPrevious.slice(0, startIndex),
          mdGeneratedBlock,
          mdPrevious.slice(endIndex + endComment.length),
        ].join('');

  await fs.writeFile(readmePath, mdUpdated);

  console.info(`Updated Markdown docs in ${readmePath}`);
}

/**
 * Generate Markdown file for specified ESLint config.
 * @param {string} name Config file name without extension
 * @param {import('./helpers/types').PeerDep[]} peerDeps Peer dependencies
 */
async function generateConfigDocs(name, peerDeps) {
  const eslint = new ESLint({
    baseConfig: { extends: `@code-pushup/eslint-config/legacy/${name}.js` },
    useEslintrc: false,
  });

  /** @type {import('eslint').Linter.Config} */
  const config = await eslint.calculateConfigForFile(configPattern(name));

  /** @type {import('eslint').Linter.Config | null} */
  const configExtra = configExtraPattern(name)
    ? await eslint.calculateConfigForFile(configExtraPattern(name))
    : null;

  /** @type {import('eslint').Linter.Config} */
  const testConfig = await eslint.calculateConfigForFile('*.test.ts');
  const testConfigRules = configExtraPattern(name)?.endsWith('.html')
    ? {
        ...testConfig.rules,
        ...(await eslint.calculateConfigForFile('*.test.ts.html')).rules,
      }
    : testConfig.rules;

  const extendedConfigs = await getConfigExtends(name)
    .filter(alias => alias.startsWith('@code-pushup'))
    .reduce(
      /** @param {Promise<Record<string, string[]>>} acc  */
      async (acc, alias) => {
        const record = await acc;
        const eslint = new ESLint({
          baseConfig: { extends: alias },
          useEslintrc: false,
        });
        /** @type {import('eslint').Linter.Config} */
        const { rules } = await eslint.calculateConfigForFile(
          configPattern(name),
        );
        return {
          ...record,
          [alias]: getEnabledRuleIds(rules),
        };
      },
      Promise.resolve({}),
    );
  const extendedRuleIds = Object.values(extendedConfigs).flat();

  const ruleIds = getEnabledRuleIds({
    ...testConfigRules,
    ...config.rules,
    ...configExtra?.rules,
  }).filter(ruleId => !extendedRuleIds.includes(ruleId));
  const rules = eslint.getRulesMetaForResults([
    {
      messages: ruleIds.map(ruleId => ({ ruleId })),
      suppressedMessages: [],
    },
  ]);

  const markdown = configRulesToMarkdown(
    name,
    ruleIds.map(id => {
      const entry = config.rules[id] ?? configExtra?.rules[id];
      const level = ruleLevelFromEntry(entry);
      const testLevel = ruleLevelFromEntry(testConfigRules[id]);
      return {
        id,
        meta: rules[id],
        level,
        ...(Array.isArray(entry) &&
          entry.length > 1 && {
            options: entry.slice(1),
          }),
        ...(testLevel &&
          testLevel !== level && {
            testOverride: {
              level: testLevel,
            },
          }),
      };
    }),
    Object.entries(extendedConfigs).map(([alias, rules]) => ({
      alias,
      rulesCount: rules.length,
    })),
    peerDeps,
    {
      hideOverrides: isConfigForTests(name),
    },
  );

  const filePath = path.join(docsDir, `${name}.md`);
  await fs.writeFile(filePath, markdown);

  console.info(`Generated Markdown docs in ${filePath}`);
}
