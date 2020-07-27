// import $ from 'jquery'
// import moment from 'moment'
// // 手动引入所需要语言包
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn');
// const r = moment().endOf('day').fromNow();
// console.log(r);

// import React from "react";
// import { render } from "react-dom";
// render(<h1> jsx </h1>, document.getElementById('root'));



// let button = document.createElement('button');
// button.innerHTML = "hello"
// button.addEventListener('click', function () {
//   // jsonp实现动态加载文件
//   import('./test.js').then(data=> {
//     console.log(data);
//     console.log(data.default);
//   })
// })
// document.body.appendChild(button)
// import str from './test.js'
if(module.hot){ // 如果当前文件支持热更新，调用accept监听test文件的热更新
  module.hot.accept('./test.js', function () {
    console.log('文件更新了');
    let str = require('./test.js')
    console.log(str);
  })
}
// console.log(str);