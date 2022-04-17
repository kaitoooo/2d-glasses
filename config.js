const path = require('path');
const config = {
    src: path.resolve(__dirname, 'src'),
    pages: path.resolve(__dirname, 'src/pages'),
    assets: path.resolve(__dirname, 'src/assets'),
    dist: path.resolve(__dirname, 'dist'),
};

module.exports = config;
