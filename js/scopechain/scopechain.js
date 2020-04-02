// /**
//  * @description: 块级作用域 test1
//  */
// console.log(x, 'start')
// {
//     console.log(x, 1);
//     function x() {

//     }
//     console.log(x, 2)
//     x = 1;
//     console.log(x, 3)
// }
// console.log(x, 'end')



// /**
//  * @description: 块级作用域 test2
//  */
// {
//     x = 1;
//     function x() {

//     }
// }
// console.log(typeof x);





// /**
//  * @description: test3
//  */
// var foo = function foo() {
//     foo = 1;
//     console.log(typeof foo); // function
// }
// console.log(foo); // function
// var baz = function bar() {
//     baz = 1;
//     console.log(baz); // 1
// }
// console.log(baz()); // 1
// var fn = function fnn() {
//     fnn = 1;
//     console.log(fnn); // function
// }
// function fxx() {
//     fxx = 1;
// }
// console.log(fxx); // function
// console.log(fxx()); // 1





/**
 * @description: test4
 */
function fun(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            return fun(m, n);
        }
    }
}

var a = fun(0); // undefined
/* 
a = {
        fun: function (m) {
            return fun(m, 0);
        }
    }
 */
a.fun(1);
/* 
执行 fun(1, 0);
console.log(o) // 0
最终：return {
        fun: function (m) {
            return fun(m, 1);
        }
    }
*/
a.fun(2);
/*
执行 fun(2, 0);
console.log(o) // 0
最终：return {
        fun: function (m) {
            return fun(m, 2);
        }
    }
*/

var b = fun(0).fun(1).fun(2).fun(3);
/*
console.log(o); // undefined
fun(1)就是执行 fun(1, 0);
console.log(o) // 0
return {
        fun: function (m) {
            return fun(m, 1);
        }
}

.fun(2)就是执行 fun(2, 1);
console.log(o) // 1
return {
        fun: function (m) {
            return fun(m, 2);
        }
}
.fun(3)就是执行 fun(3, 2);
console.log(o) // 2
return {
        fun: function (m) {
            return fun(m, 3);
        }
}
*/

var c = fun(0).fun(1);
/*
console.log(o); // undefined
fun(1)就是执行 fun(1, 0);
console.log(o) // 0
return {
        fun: function (m) {
            return fun(m, 1);
        }
}
*/

c.fun(2);
/*
{
        fun: function (m) {
            return fun(m, 1);
        }
}
fun(2)就是执行 fun(2, 1);
console.log(o) // 1
return {
        fun: function (m) {
            return fun(m, 2);
        }
}
*/

c.fun(3);
/*
{
        fun: function (m) {
            return fun(m, 1);
        }
}
fun(3)就是执行 fun(3, 1);
console.log(o) // 1
return {
        fun: function (m) {
            return fun(m, 3);
        }
}
*/