const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js', // 指定每次打包时文件名含hash戳，位数是8位
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        contentBase: './build',
        hot: true, // 启用热更新
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'build', 'manifest.json')
            // webpack在打包业务代码的时候，会通过这个插件参考是否有已经打包在vendor中的模块。
           // 如果存在就不会将代码打包进去而是通过一个统一的name(这个name在这里就是下面的name)来引入模块。
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: false,
            hash: true,
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ],
    module: {
        noParse: /jquery/, // 不去解析jquery中的依赖库
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", '@babel/preset-react'],
                },
            }],
            include: path.resolve(__dirname, "src"), // 查找范围
            exclude: /node_modules/, // 不查找文件
        }],


    },

}