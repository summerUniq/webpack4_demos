# 样式文件的打包
- CSS css-loader style-loader
- less less-loader css-loader style-loader
- sass node-sass css-loader style-loader
- stylus stylus stylus-loader

- 安装loader
- 添加配置
```
 module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insert: function(element) {
                            var parent = document.querySelector('head');
                            var lastInsertedElement = window._lastElementInsertedByStyleLoader;
                            if (!lastInsertedElement) {
                                parent.insertBefore(element, parent.firstChild);
                            } else if (lastInsertedElement.nextSibling) {
                                parent.insertBefore(element, lastInsertedElement.nextSibling)
                            } else {
                                parent.appendChild(element)
                            }

                        }
                    },
                }, 'css-loader']
            },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        ]
    }
 ```

- 抽离css打包后的css样式, link标签引入 mini-css-extract-plugin 
    (需要自己压缩生产的css文件: 需要插件optimize-css-assets-webpack-plugin,在配置文件中添加optimization; 影响： mode: production失效，需要使用插件压缩打包后的js: uglifyjs-webpack-plugin)
- 自动添加前缀 autoprefixer包 postcss-loader 需要配置文件 postcss.config.js