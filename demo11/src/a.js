require('@babel/polyfill');

console.log('我是a模块');

class B {

}

function* gen(params) {
    yield 1;
}
console.log(gen().next());

"SSS".includes('S');