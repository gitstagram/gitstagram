module.exports = {
  // Stylelint --fix not supported with processor
  // https://github.com/styled-components/stylelint-processor-styled-components#readme
  // Use `yarn lint:styles` to check stylelinting with processor with .stylelintrcWithProcessor.js
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
    // ignore custom fonts
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['Cookie'] },
    ],
    // conflicts with prop activated selectors
    'no-duplicate-selectors': null,
  },
}
