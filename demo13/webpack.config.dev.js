const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'production',
    devServer: {
        port: 3000,
        contentBase: './build',
        progress: true,
        open: false,
    },
    externals: {
        jquery: "$"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors:  {
                     priority: 1, // 优先抽取
                     test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    // minSize: 0, // 公共代码大小超过0字节
                    // minChunks: 1, // 使用次数超过1次
                    },
                common: {
                    chunks:'initial',
                    minSize: 0,
                    minChunks: 2,
                },
            }
                
        },
        minimizer: [new OptimizeCssAssetsWebpackPlugin(), new UglifyjsWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
        })]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            chunks: ['home'],
            minify: false,
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other'],
            minify: false,
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([{
        //     patterns: [{ from: __dirname + '/demo13/doc', to: __dirname + "/demo13/build/doc" }]
        // }])
        new CopyWebpackPlugin({
            patterns: [{
                from: './doc',
                to: './doc'
            }]
        }),
        new webpack.BannerPlugin('我是summer 2020.07.23')
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
    // devtool: "source-map",
    // watch: true,
    // watchOptions: {
    //     poll: 1000,
    //     aggregateTimeout: 500,
    //     ignored: /node_modules/
    // }
}