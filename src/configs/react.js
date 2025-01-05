// @ts-check

import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { REACT_FILE_PATTERNS } from '../lib/patterns.js';
import javascript from './javascript.js';

export default tseslint.config(...javascript, {
  files: REACT_FILE_PATTERNS,
  languageOptions: {
    globals: globals.browser,
  },
  extends: [
    // @ts-expect-error types inferred as possibly undefined
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    {
      name: 'code-pushup/react/react-hooks',
      plugins: {
        // @ts-expect-error inferred index signature mismatch
        'react-hooks': reactHooks,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
    {
      name: 'code-pushup/react/customized',
      rules: {
        'react/display-name': 'warn',
        'jsx-a11y/no-autofocus': 'warn',
        'jsx-a11y/no-redundant-roles': 'warn',
      },
    },
    {
      name: 'code-pushup/react/additional',
      rules: {
        'react/button-has-type': 'error',
        'react/default-props-match-prop-types': 'error',
        'react/forbid-component-props': 'warn',
        'react/forbid-prop-types': 'error',
        'react/forward-ref-uses-ref': 'error',
        'react/function-component-definition': 'warn',
        'react/hook-use-state': 'warn',
        'react/iframe-missing-sandbox': 'error',
        'react/jsx-boolean-value': 'warn',
        'react/jsx-curly-brace-presence': [
          'warn',
          { props: 'never', children: 'never', propElementValues: 'always' },
        ],
        'react/jsx-filename-extension': [
          'warn',
          { extensions: ['.jsx', '.tsx'] },
        ],
        'react/jsx-fragments': 'warn',
        'react/jsx-handler-names': 'warn',
        'react/jsx-max-depth': ['warn', { max: 10 }],
        'react/jsx-no-bind': 'error',
        'react/jsx-no-constructed-context-values': 'error',
        // jsx-no-leaked-render produces false positives because it doesn't check for safe types: https://github.com/jsx-eslint/eslint-plugin-react/issues/3292
        // eslint-plugin-jsx-expressions is more accurate, but blocked by v9 support: https://github.com/hluisson/eslint-plugin-jsx-expressions/pull/19
        'react/jsx-no-leaked-render': 'warn',
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-pascal-case': 'warn',
        'react/jsx-props-no-spread-multi': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-arrow-function-lifecycle': 'warn',
        'react/no-danger': 'error',
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-invalid-html-attribute': 'error',
        'react/no-multi-comp': ['warn', { ignoreStateless: true }],
        'react/no-namespace': 'error',
        'react/no-object-type-as-default-prop': 'error',
        'react/no-redundant-should-component-update': 'warn',
        'react/no-this-in-sfc': 'error',
        'react/no-typos': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/no-unused-class-component-methods': 'warn',
        'react/no-unused-prop-types': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-will-update-set-state': 'error',
        'react/prefer-es6-class': 'warn',
        'react/prefer-stateless-function': 'warn',
        'react/self-closing-comp': 'warn',
        'react/state-in-constructor': 'warn',
        'react/static-property-placement': 'warn',
        'react/style-prop-object': 'warn',
        'react/void-dom-elements-no-children': 'error',
        'jsx-a11y/prefer-tag-over-role': 'warn',
      },
    },
  ],
});
