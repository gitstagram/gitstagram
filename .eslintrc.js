module.exports = {
  ignorePatterns: ['**/generated/*.ts'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:promise/recommended',
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-debugger': 'warn',
    'no-console': 'warn',
    // Allows template interpolation with styled-components
    '@typescript-eslint/restrict-template-expressions': 'off',
    // Next link needs empty <a></a> wrappers
    'jsx-a11y/anchor-is-valid': 'off',
    // Allows _ to be unused in destructuring
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
  },
}
