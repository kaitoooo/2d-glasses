/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
};

module.exports = config;
