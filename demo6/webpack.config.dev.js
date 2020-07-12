const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js', // 指定每次打包时文件名含hash戳，位数是8位
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: './build',
        progress: true,
        open: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板
            filename: 'index.html', // 引入打包后js的html的文件名
            minify: {
                removeAttributeQuotes: true, // 压缩双引号
                collapseWhitespace: true, // 压缩空白行
            },
            hash: true, // 引用bundle.js时添加hash戳
        })
    ]
}