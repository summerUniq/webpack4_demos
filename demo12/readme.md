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
