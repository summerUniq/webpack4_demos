# 跨域
- 代理 http-proxy

```
// webpack.config.js
 devServer: {
        proxy: { // 请求8080端口以/api开始的接口重定向到3000端口
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {
                    '/api': '',
                }
            }
        }
    },
```
- 前端mock数据

```
// index.js
let xhr = new XMLHttpRequest();
xhr.open('GET', "/user", true);
xhr.onload = function() {
    console.log(xhr.response);
}
xhr.send()

// webpack.config.js
    devServer: {
        before(app) {
            app.get('/user', (req, res) => {
                res.json({ name: 'before 3000端口' })
            })
        },
    },
```
- 服务端启动webpack（有服务端不用代理，端口使用服务端端口）webpack-dev-middleware
yarn add webpack-dev-middleware -D
```
// server.js 


const express = require('express');
let app = express();

const webpack = require('webpack');
// 中间件
const middle = require('webpack-dev-middleware');
const config = require('./webpack.config.dev.js');
const complier = webpack(config);
app.use(middle(complier))


app.get('/user', (req, res) => {
    res.json({ name: 'express 3000端口' })
})

app.listen(3000);

```

# resolve
解析第三方模块
```
    resolve: {
        modules: [path.resolve('node_modules')], // 指定只查找当前目录下的node_modules
        // mainFields: ['style', 'main'], // 指定查找顺序
        // mainFiles: [], // 指定入口文件
        // alias: { // 别名
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        extensions: ['.js', '.css', '.json'] // 文件省略后缀的情况下的查找顺序
    },
```

# 定义环境变量 （区分开发和产线环境）webpack 内置插件 definePlugin
```
const webpack = require('webpack');

    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('production'),
            FLAG: 'true',
        })
    ],
```
# 区分不同环境 webpack-merge
yarn add webpack-merge -D

```
// webpack.config.js
const commonConfig = { ... };
 
const productionConfig = { ... };
 
const developmentConfig = { ... };
 
module.exports = env => {
  switch(env) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}
```
