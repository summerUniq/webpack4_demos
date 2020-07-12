 # 本地起服务器
- 安装：yarn add webpack-dev-server -D
- 启动： npx webpack-dev-server
- 配置服务器
webpack.config.js
```
 devServer: {
        port: 3000,
        contentBase: './dist',
        progress: true,
        open: false,
    }
```
- 配置执行脚本
package.json
```
script: {
    dev: "webpack-dev-server --config webpack.config.dev.js"
}
```
