import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logError, formatError, logChanges, logInfo } from './lib/output.js';
import {
  detectPackageManager,
  installDependencies,
} from './lib/package-manager.js';
import { validateConfigSlugs } from './lib/prompts.js';
import { NODE_VERSION_SOURCES } from './lib/types.js';
import { runSetupWizard } from './lib/wizard.js';

const argv = await yargs(hideBin(process.argv))
  .scriptName('create-eslint-config')
  .usage('$0 [options]')
  .option('configs', {
    type: 'string',
    array: true,
    describe: 'Configs to include (skips the checkbox prompt)',
  })
  .option('tsconfig', {
    type: 'string',
    describe: 'Path to the tsconfig (skips the typescript prompt)',
  })
  .option('node-version-source', {
    type: 'string',
    choices: NODE_VERSION_SOURCES,
    describe: 'Where to read the Node version from',
  })
  .option('node-version', {
    type: 'string',
    describe: 'Manual Node version range',
  })
  .option('yes', {
    type: 'boolean',
    alias: 'y',
    default: false,
    describe: 'Skip all prompts and use recommended defaults',
  })
  .option('dry-run', {
    type: 'boolean',
    default: false,
    describe: 'Show what would happen without writing or installing',
  })
  .check(parsed => {
    if (parsed.configs) {
      validateConfigSlugs(parsed.configs);
    }
    return true;
  })
  .strict()
  .help()
  .version()
  .parse();

const targetDir = process.cwd();

try {
  const result = await runSetupWizard({
    targetDir,
    configs: argv.configs,
    tsconfig: argv.tsconfig,
    nodeVersionSource: argv.nodeVersionSource,
    nodeVersion: argv.nodeVersion,
    yes: argv.yes,
  });

  logChanges(result.files);

  if (argv.dryRun) {
    logInfo('Dry run — no files written.');
  } else {
    await result.flush();
    const manager = await detectPackageManager(targetDir);
    logInfo(`Installing dependencies with ${manager}...`, '');
    try {
      await installDependencies(targetDir, manager);
    } catch (error) {
      logError(
        formatError(error),
        'Files were written successfully. Resolve the conflict above and re-run the install manually.',
      );
      process.exitCode = 1;
    }
  }

  // TODO: remove snippet output once the wizard can merge into existing configs
  if (result.manualSnippet) {
    const filename = result.manualSnippetPath
      ? path.basename(result.manualSnippetPath)
      : 'eslint.config.js';
    logInfo(
      `Existing ${filename} detected. Here are the imports and config entries for your selections — merge manually (v1 will do this automatically):`,
      '',
      result.manualSnippet,
    );
  } else if (!argv.dryRun && !process.exitCode) {
    logInfo('Next step: run `npx eslint .` to verify the setup.');
  }
} catch (error) {
  logError(formatError(error));
  process.exitCode = 1;
}
