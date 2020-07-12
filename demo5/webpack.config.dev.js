const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: './build',
        progress: true,
        open: false,
    }
}