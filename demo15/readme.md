# webpack 的优化
yarn add webpack webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react webpack-dev-server -D

## noParse: 不去解析指定库中的依赖关系，提高打包速度
使用场景： 提前知道第三方库没有依赖
```
 module: {
        noParse: /jquery/, // 不去解析jquery中的依赖库
    },
```

## IgnorePlugin： webpack内置插件--忽略掉第三方插件的某些内容，手动实现按需引用
运用场景： moment第三方插件，语言包的引用
package.json: main:moment.js -> aliasedRequire('./locale/' + name);
引入locale，所有语言包
- 没配置前打包文件大小
> Version: webpack 4.44.0
Time: 2231ms
Built at: 2020-07-27 7:12:16 AM
  Asset      Size  Chunks             Chunk Names
main.js  1.37 MiB    main  [emitted]  main
Entrypoint main = main.js
- 配置
```
const webpack = require('webpack');
module.exports= {
      plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /monent/)
    ],
}

```
- 配置后打包文件大小
Version: webpack 4.44.0
Time: 2425ms
Built at: 2020-07-27 7:42:21 AM
             Asset       Size  Chunks                         Chunk Names
bundle.1956a6f4.js    862 KiB    main  [emitted] [immutable]  main
        index.html  308 bytes          [emitted]
Entrypoint main = bundle.1956a6f4.js

## dllPlugin---动态链接库 DllReferencePlugin + DllPlugin webpack内置插件
应用场景： 打包时不打包react, react-dom
yarn add react react-dom
目的：不希望在开发热更新时重复打包第三方模块，否则速度太慢。
打包完第三方依赖后，就要去打包业务代码，这个时候就需要让业务代码知道不要再去打包哪些第三方模块了
直接从打包好的__dll_react.js里面去取就可以了
在这里打包第三方依赖的时候，生成一份说明文件manifest.json，来让webpack在打包业务代码的时候
知道打包哪些模块需要从__dll_react.js里面取而不是重新打包


>总结整体流程：
通过dllPlugin生成manifets.json和_dll_react.js，vendor.js会自执行返回一个加载函数_dll_react(名字可配置)，通过闭包将模块存储在内存中，注意_dll_react是一个全局变量。
webpack通过DllReferencePlugin在打包的时候分析业务代码中使用了哪些第三方模块，哪些模块是不需要打包进业务代码中，而是去_dll_react.js中获取。
vendor中获取的模块是通过调用全局函数_dll_react(id)来进行引入。

## happypack --- 使用多线程打包
yarn add happypack
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack')
module.exports = {
    plugins: [
        new Happypack({
            id: 'js',
            use :  [{
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", '@babel/preset-react'],
                },
            }],
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: 'Happypack/loader?id=js',
            include: path.resolve(__dirname, "src"), // 查找范围
            exclude: /node_modules/, // 不查找文件
        }],
    },

}
```

## webpack自带优化
- tree-shaking
默认情况下在production模式下， import 会自动去除掉没用的代码 tree-shaking
es6模块会把结果放到default上
结论：建议使用import 语法
- scope hosting
会自动省略一些可以简化的代码： 比如简单的表达式计算
## 抽离公共代码
使用场景：多页应用引入公共模块
- 抽离自定义公共文件
demo13
```
optimization: {
  splitChunks: {  // 分割代码块
    cacheGroups: { // 缓存组
     common:  {chunks: 'initail',
      minSize: 0, // 公共代码大小超过0字节
      minChunks: 1, // 使用次数超过1次
    }
  }
}
```
- 抽离第三方模块
```
optimization: {
  splitChunks: {  // 分割代码块
    cacheGroups: { // 缓存组
     vendors:  {
       priority: 1, // 优先抽取
       test: /node_modules/,
      chunks: 'initail',
      minSize: 0, // 公共代码大小超过0字节
      minChunks: 1, // 使用次数超过1次
    }
  }
}
```
>chunks：表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks；
minSize：表示抽取出来的文件在压缩前的最小大小，默认为 30000；
maxSize：表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
minChunks：表示被引用次数，默认为1；上述配置commons中minChunks为2，表示将被多次引用的代码抽离成commons。



## 懒加载的实现 ----import语法
```
let button = document.createElement('button');
button.innerHTML = "hello"
button.addEventListener('click', function () {
  // jsonp实现动态加载文件
  import('./test.js').then(data=> {
    console.log(data);
    console.log(data.default);
  })
})
document.body.appendChild(button)
```

## 热更新
```
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    
    devServer: {
        contentBase: './build',
        hot: true, // 启用热更新
    },
    plugins: [
      
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ],

}
```
```
// index.js
if(module.hot){ // 如果当前文件支持热更新，调用accept监听test文件的热更新
  module.hot.accept('./test.js', function () {
    console.log('文件更新了');
    let str = require('./test.js')
    console.log(str);
  })
}
```