// 模拟ajax 请求
// import "bootstrap";
let url = "";
if (DEV === 'dev') {
    url = "http://localhost:3000"
} else if (DEV === 'production') {
    url = "http://m.yqb.com"
}

console.log(url);


// let xhr = new XMLHttpRequest();
// xhr.open('GET', "/user", true);
// xhr.onload = function() {
//     console.log(xhr.response);
// }
// xhr.send()