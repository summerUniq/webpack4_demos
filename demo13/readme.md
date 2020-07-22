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