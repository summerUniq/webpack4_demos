require('jquery')
console.log("window.$", window.$);
console.log('$', $);
const a = require('./a.js')

require('./main.css');
require('./main.less')


console.log("我是index模块");
console.lo(1111111111111111111);

@log
class A {
    a = 1;
}
let b = new A()
console.log(b.a);

function log(target) {
    console.log(target);
}