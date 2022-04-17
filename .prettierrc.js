/** @type {import('prettier').Options} */
const config = {
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    useTabs: false,
    printWidth: 200,
    endOfLine: 'auto',
    overrides: [
        {
            files: ['*.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

module.exports = config;
