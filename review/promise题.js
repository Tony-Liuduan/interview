/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-10 16:22:10
 * @LastEditTime 2020-07-10 18:20:25
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

    await a

    console.log('after1')

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