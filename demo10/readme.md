# 全局变量的设置
exp: 将 $ from "jquery"挂载到window上
一、 expose-loader
1- expose-loader (全局loader/内联loader)
- 安包
yarn add expose-loader
- 引用： 
1) 方法一 // // 这种会报错
```
import $ from 'expose-loader?$!jquery'; 
console.log(window.$, $);
// 通过属性名 "libraryName" 暴露 file.js 的 exports 到全局上下文。
// 在浏览器中，就将可以使用 window.libraryName 访问。
```
2) 方法二

// webpack.config.dev.js
```
{
                test: require.resolve('jquery'),
                use: {
                    loader: "expose-loader",
                    options: {
                        exposes: {
                            globalName: '$'
                        }
                    }
                }
            },
```
然后正常引用
```
require('jquery')
console.log("window.$", window.$);
```
这种方式比较麻烦的是必须在每个模块中引入jquery,解决方式是推过webpack的插件在每个js文件注入$  

二、 webpack.providePlugin() 在每个模块注入$,没有挂载到window上
```
// webpack.config.dev.js
const webpack = require('webpack');
plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        })
    ],
```
三、在index.html中引入cdn，并且配置不打包jquery
```
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
```
配置引入不打包
```
// webpack.config.dev.js
    externals: {
        jquery: "$"
    }
```
