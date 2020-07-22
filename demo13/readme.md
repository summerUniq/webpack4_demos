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
