// 模拟服务器


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