# babel-将es6/es7语法转化成es5语法

1- es6 语法
- 安包 
```yarn add babel-loader @babel/core @babel/preset-env -D```
- 配置 - (es6转成es5)
```
     {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            }
 ```
2- es6 高级语法转化成es5  ----  @babel/plugin-proposal-class-properties; @babel/plugin-proposal-decorators
- 安包
```
yarn add  @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators -D
```

- 配置
```
{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                         plugins: [
                        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                        ['@babel/plugin-proposal-class-properties', { "loose": true }]
                    ]
                    },
                   

                }]
            }
```
3- 装饰器语法报错的解决
Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.ts(1219)

- 新增配置文件jsconfig.json
```
// jsconfig.json
{
    "compilerOptions": {
        "experimentalDecorators": true,
    }
}
```
- 重启vscode

4- 内置api 和promise的转化---- @babel/plugin-transform-runtime(必配)
- 代码
```
function * gen(params) {
    yield 1;
}
console.log(gen().next());
```
- npm run dev 
控制台报错
Uncaught ReferenceError: regeneratorRuntime is not defined
原因：打包对gen进行了解析, 使用到了regeneratorRuntime， 但是不会自动帮引入这个api
- 安包
```yarn add @babel/plugin-transform-runtime -D```
```yarn add @babel/runtime --save```
- 配置
```
 {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                         plugins: [
                        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                        ['@babel/plugin-proposal-class-properties', { "loose": true }],
                        "@babel/plugin-transform-runtime" // 新增插件
                    ]
                    },
                   

                }],
                include: path.resolve(__dirname, "src"),// 查找范围
                exclude: /node_modules/, // 不查找文件
            }
```

5- 解析实例上的方法 ---- 
实例上的方法默认不会解析
- 代码
```
// a.js
"SSS".includes("S")
```
- npm run build 
 return _context.stop();\n      }\n    }\n  }, _marked);\n}\n\nconsole.log(gen().next());\n\"SSS\".includes('S');\n\n//# sourceURL=webpack:///./src/a.js?");
可以看到代码没有被解析
- 安包
yarn add @babel/polyfill
- 引用包
```
// a.js
require('@babel/polyfill');
"SSS".includes("S")
```

6- js添加校验 -- eslint
- 安包
yarn add eslint eslint-loader
- 配置文件 .eslintrc.json 新建 (官网--DEMO-download)
- 配置 新增moudule.rules, 设计执行的顺序，强制优先执行 enforce: "pre"  

```
       {
                test: /\.js$/,
                use:[{
                    loader: 'eslint-loader',
                    options: {
                        enforce: "pre"
                    }
                }],
            },
```



