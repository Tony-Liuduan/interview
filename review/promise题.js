/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-10 16:22:10
 * @LastEditTime 2020-07-20 11:06:42
 */
const a = new Promise((resolve, reject) => {

    console.log('promise1')

    resolve()

}).then(() => {

    console.log('promise2')

})

setTimeout(() => {

    console.log('timeout')

})


const b = new Promise(async (resolve, reject) => {

    await Promise.resolve();

    console.log('after1')

    // UnhandledPromiseRejectionWarning: ReferenceError: Cannot access 'b' before initialization
    // console.log(b.then);
    await b

    console.log('after2')

    resolve()

}).then(() => {
    console.log('b then');
})


console.log('end');


/* 
promise1
end
promise2
after1
timeout
*/