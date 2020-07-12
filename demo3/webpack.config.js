// webpack 的配置文件， node模块化 语法
const path = require('path');
module.exports = {
    "entry": "./src/index.js", // 入口文件名
    "output": {
        filename: "bundle.js", // 文件名称
        path: path.resolve(__dirname, 'dist'), // 相对路径
    },
    "mode": 'development',
}