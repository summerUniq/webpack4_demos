# 打包多页应用
修改配置 entry 和 output, 多html
```
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, 'build'),
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
        })]
```
# watch 的使用----实现实时打包
```
// webpack.config.js
watch: true,
watchOptions: {
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖，停止输入代码500s后打包文件
    ignored: /node_modules/,  // 不需要监控哪个文件
}

```
# webpack的小插件的应用
- clean-webpack-plugin 需安装： 新打包前删除打包文件夹如build， 参数为空或对象
```
yarn add clean-webpack-plugin --save-dev
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 plugins: [
        new CleanWebpackPlugin(),
    ],

```
- copy-webpack-plugin 需安装： 拷贝文件到打包后文件夹 参数： 数组 + 对象
```
yarn add copy-webpack-plugin --save-dev
// webpack.config.js
const CopyWebpackPlugin  = require('copy-webpack-plugin');
 plugins: [
        new CopyWebpackPlugin({
             patterns: [{
                from: './doc',
                to: './doc' // 在build文件夹下的路径
            }]
        }),
    ],
```
- bannerPlugin 内置 需要引入webpack： 在打包后的js文件中插入指定字符串 参数： 字符串
```
const webpack = require('webpack');
 plugins: [
        new webpack.BannerPlugin('我是summer 2020.07.23')
    ],
```
