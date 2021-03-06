/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-04-29 17:51:07
 * @LastEditTime 2020-07-22 13:01:00
 */
const fs = require('fs');
let counts = 0;

function wait(mstime) {
    let date = Date.now();
    while (Date.now() - date < mstime) {
        // do nothing
    }
}

function asyncOperation(callback) {
    fs.readFile('./test.js', callback);
}

const lastTime = Date.now();

asyncOperation(() => {
    console.log('poll');
    setTimeout(() => {
        console.log('poll timeout')
    }, 0)
    setImmediate(() => {
        console.log('poll immediate')
    })
});

setTimeout(() => {
    console.log('timers', Date.now() - lastTime + 'ms');
}, 0);

// setTimeout(() => {
//     console.log('setTimeout', 6);
//     process.nextTick(() => {
//         console.log('nextTick')
//     })
// }, 6);

process.nextTick(() => {
    console.log('nextTick')
})

setImmediate(() => {
    console.log('setImmediate')
})

// process.nextTick(() => {
//     // 进入event loop
//     // timers阶段之前执行
//     wait(20);
//     asyncOperation(() => {
//         console.log('poll');
//     });
// });



/**
 * result:
 * timers 21ms
 * poll
 */
