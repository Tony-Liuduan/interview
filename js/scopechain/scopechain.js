/**
 * @description: 块级作用域 test1
 */
console.log(x, 'start')
{
    console.log(x, 1);
    function x() {

    }
    console.log(x, 2)
    x = 1;
    console.log(x, 3)
}
console.log(x, 'end')



/**
 * @description: 块级作用域 test2
 */
{
    x = 1;
    function x() {

    }
}
console.log(typeof x);





/**
 * @description: test3
 */
var foo = function foo() {
    foo = 1;
    console.log(typeof foo); // function
}
console.log(foo); // function
var baz = function bar() {
    baz = 1;
    console.log(baz); // 1
}
console.log(baz()); // 1
var fn = function fnn() {
    fnn = 1;
    console.log(fnn); // function
}
function fxx() {
    fxx = 1;
}
console.log(fxx); // function
console.log(fxx()); // 1
