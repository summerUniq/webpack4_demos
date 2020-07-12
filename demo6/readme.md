# html插件-html-webpack-plugin
- yarn add html-webpack-plugin
- 创建模板 src/index.html
- 添加配置 webpack.config.js 
    - 引入插件
    - plugins: []
    ```
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
    ```
