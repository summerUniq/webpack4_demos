# 打包后样式文件的抽离，link标签的引入
- 安装插件 ```yarn add mini-css-extract-plugin -D```
- 配置
```
    plugins: [
        new MiniCssExtractPlugin({

        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
        ]
    }
```
# 打包后css文件的压缩和js文件的压缩
- 安装插件 ```yarn add optimize-css-assets-webpack-plugin -D```
- 配置
```
 optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    }
```
- 压缩js uglifyjs-webpack-plugin
```
yarn add uglifyjs-webpack-plugin -D
```
```
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin(), new UglifyjsWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
        })]
```
需要避免有es6语法，不然会报错


# css样式自动添加前缀
- 安装npm 包 + loader autoprefixer + postcss-loader
```
yarn add autoprefixer postcss-loader -D
```
- 配置
 1- 添加配置文件 postcss.config.js 告诉postcss-loader使用什么插件
 ```
 // postcss.config.js
 module.exports = {
    plugins: [require('autoprefixer')]
}

 ```
 2- 在css-loader使用前添加post-loader, 并进行插件的配置

 ```
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
 ```



# 总结：

- 抽离css打包后的css样式, link标签引入 mini-css-extract-plugin 
    (需要自己压缩生产的css文件: 需要插件optimize-css-assets-webpack-plugin,在配置文件中添加optimization; 影响： mode: production失效，需要使用插件压缩打包后的js: uglifyjs-webpack-plugin)
- 自动添加前缀 autoprefixer包 postcss-loader 需要配置文件 postcss.config.js