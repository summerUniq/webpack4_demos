const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
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
    externals: {
        jquery: "$"
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin(), new UglifyjsWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
        })]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板
            filename: 'index.html', // 引入打包后js的html的文件名
            minify: false,
            // minify: {
            //     removeAttributeQuotes: true, // 压缩双引号
            //     collapseWhitespace: true, // 压缩空白行
            // },
            hash: true, // 引用bundle.js时添加hash戳
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css' // 抽离后的文件样式名
        }),
    ],
    module: {
        rules: [
            // {
            //     test: /\.(png|jpg|svg|jpeg)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             esModule: false
            //         }
            //     }]
            // },
            {
                test: /\.(png|jpg|svg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 不加的话会有这种情况 img属性src="[object Module]"
                        limit: 1024 * 100, // 当小于100kb时候生产base64                   
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
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
    }
}