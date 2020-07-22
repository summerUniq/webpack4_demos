# 打包文件分类
主要解决方案是在生成资源的额时候配置路径

- CSS 
```
 plugins: [
           new MiniCssExtractPlugin({
            filename: 'css/main.css' // 抽离后的文件样式名
        }),
    ],
```
- IMAGE
```
rules: [{
                test: /\.(png|jpg|svg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 不加的话会有这种情况 img属性src="[object Module]"
                        limit: 1, // 当小于100kb时候生产base64  
                        outputPath: 'img/'
                    }
                }
            }]
```
# 引用打包的资源前面添加CDN
添加publicPath的配置
- 给所有资源添加
```
    output: {
        filename: 'bundle.[hash:8].js', // 指定每次打包时文件名含hash戳，位数是8位
        path: path.resolve(__dirname, 'build'),
        publicPath: "https://m.yqb.com"
    },
```
- 给单种类型资源添加
```
{
                test: /\.(png|jpg|svg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 不加的话会有这种情况 img属性src="[object Module]"
                        limit: 1, // 当小于100kb时候生产base64  
                        outputPath: '/img/',
                        publicPath: 'https://m.yqb.com'
                    }
                }
 },

```
# source-map: production模式下如果代码报错无法定位，souce-map源码映射帮助代码调试
- devtool: "source-map" 
    单独生成一个sourcemap文件，标识出错的行列
- devtool: "eval-source-map"
    不会产生单独的文件，标识出错的行列
- devtool: "cheap-module-source-map"
    产生一个单独的映射文件， 不标识错误列
- devtool: "cheap-moudle-eval-source-map"
    不产生文件，集成在打包后的文件中，不标识错误列