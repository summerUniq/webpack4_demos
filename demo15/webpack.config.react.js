let path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry : {
        // test: './src/test.js',
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'build'),
        library: "_dll_[name]", // 产生文件导出的变量名（定义变量接受自调用函数的返回值）
        libraryTarget: 'var', // 定义变量声明的格式 umd commonjs var this...
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]', // name === library
            path: path.resolve(__dirname, 'build', 'manifest.json') // 任务清单存放位置
        })
    ]
}