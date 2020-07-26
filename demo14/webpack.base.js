const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js', // 指定每次打包时文件名含hash戳，位数是8位
        path: path.resolve(__dirname, 'build'),
    },
    externals: {
        jquery: "$"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', // 指定模板
            filename: 'index.html', // 引入打包后js的html的文件名
            minify: false,
            hash: true, // 引用bundle.js时添加hash戳
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css' // 抽离后的文件样式名
        }),
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev')
        })
    ],
    module: {
        rules: [{
                test: /\.(png|jpg|svg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 不加的话会有这种情况 img属性src="[object Module]"
                        limit: 1, // 当小于100kb时候生产base64  
                        outputPath: '/img/',
                    }
                }
            },
            {
                test: /\.(html|htm)$/,
                use: [{
                    loader: 'html-withimg-loader',

                }]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: loader => [require('autoprefixer')({ browsers: ['> 0.15% in CN'] })]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                            ['@babel/plugin-proposal-class-properties', { "loose": true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    },


                }],
                include: path.resolve(__dirname, "src"), // 查找范围
                exclude: /node_modules/, // 不查找文件
            }
        ]
    },
    resolve: {
        modules: [path.resolve('node_modules')], // 指定只查找当前目录下的node_modules
        // mainFields: ['style', 'main'], // 指定查找顺序
        // mainFiles: [], // 指定入口文件
        // alias: { // 别名
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        extensions: ['.js', '.css', '.json'] // 文件省略后缀的情况下的查找顺序
    },
}