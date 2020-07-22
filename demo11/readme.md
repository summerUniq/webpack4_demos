# 图片处理 file-loader/ html-withimg-loader / url-loader
- 在js中创建图片引入： 需要结合import 和require 引入图片 file-loader
- css background： 不需要进行处理
- html中引入图片： html-withimg-loader
- 根据图片大小采用不同的方式处理图片 ： url-loader 
    小于limit将图片转化成base64格式，大于使用file-loader处理

1) js
```
import url from './images/1.png'
var img = new Image();
img.src = url;
```
- yarn add file-loader
- 配置
```
{
                test: /.(png|jpg|svg|jpeg)$/,
                use: 'file-loader',
            }
```
2) css
不需要处理
3) HTML ：
    > 使用html-withimg-loader打包html中img引入的图片，很好用，但是webpack4.x里会和html-webpack-plugin产生冲突；
    原因是file-loader升级了，以前4.2的时候是没事的，现在file-loader升级到5.0了，所以需要在file-loader的options里使用一个配置：
    esModule:false
这样就解决了；
- 代码
```
// index.html
    <img src="./images/3.jpg" alt="">
```
- yarn add html-withimg-loader
- 配置
    ```
    rules: [{
                test: /\.(png|jpg|svg|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]
            },
            {
                test: /\.(html|htm)$/,
                use: [{
                    loader: 'html-withimg-loader',

                }]
            }]
    ```
3) 图片打包格式    
- yarn add url-loader -D  
- 配置
```
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
```




