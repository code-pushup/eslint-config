const NAMING_CONVENTION_OPTIONS = [
  {
    selector: [
      'variableLike',
      'method',
      'typeProperty',
      'parameterProperty',
      'classProperty',
    ],
    format: ['camelCase'],
  },
  {
    selector: 'variable',
    format: ['camelCase', 'UPPER_CASE'],
  },
  {
    selector: 'typeLike',
    format: ['PascalCase'],
  },
  {
    selector: 'enumMember',
    format: ['PascalCase'],
  },
  {
    selector: 'parameter',
    modifiers: ['unused'],
    format: null,
    custom: {
      regex: '^(_+|[a-z][a-zA-Z0-9]*)$',
      match: true,
    },
  },
  {
    selector: 'objectLiteralProperty',
    modifiers: ['requiresQuotes'],
    format: null,
  },
  {
    selector: ['variable', 'parameter'],
    modifiers: ['destructured'],
    format: null,
  },
];

module.exports = {
  NAMING_CONVENTION_OPTIONS,
};
