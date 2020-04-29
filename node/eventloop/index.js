const fs = require('fs');
let counts = 0;

function wait(mstime) {
    let date = Date.now();
    while (Date.now() - date < mstime) {
        // do nothing
    }
}

function asyncOperation(callback) {
    fs.readFile(__dirname + '/' + __filename, callback);
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