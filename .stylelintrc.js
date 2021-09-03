module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-a11y/recommended',
    'stylelint-config-rational-order',
    'stylelint-config-styled-components',
  ],
  rules: {
    'selector-max-empty-lines': [1],
    // https://github.com/stylelint/stylelint-config-standard/issues/138
    'value-keyword-case': ['lower', { ignoreKeywords: ['dummyValue'] }],
    // conflicts with prettier
    'declaration-colon-newline-after': null,
    // conflicts with styled-components interpolations
    'declaration-empty-line-before': null,
  },
}
