const pp = new Promise(res => {
    res(new Promise(re => {
        re(1000);
    }));
})
    .then(res => {
        console.log(res);
        // 1. return thenable
        // return {
        //     then(r) {
        //         setTimeout(() => {
        //             r(
        //                 {
        //                     then(r1) {
        //                         console.log(r1);
        //                         r1(8)
        //                     }
        //                 }
        //             )
        //         }, 0);
        //     }
        // }

        // 2. return promise 实例
        // return new Promise(rr => {
        //     rr("new Promise rr");
        // })
    })
// .then(res => {
//     console.log(res);
//     return pp;
// })

process.nextTick(() => {
    console.log("nextTick");
})
// 这时不能保证 setTimeout/setImmediate执行顺序，需要看机器性能，
setImmediate(() => {
    console.log("setImmediate")
})
setTimeout(() => {
    console.log("setTimeout")
}, 0);


// 这时能保证 setTimeout/setImmediate执行顺序，setTimeout 和 setImmediate是同时注册的
// 当poll阶段执行完，setTimeout刚注册，所以一定会先执行setImmediate
const fs = require("fs");
const path = require("path");
// process.nextTick 出处
function apiCallback(arg, callback) {
    if (arg !== "string") {
        // 相当于处理 readFile 的 error作用
        process.nextTick(callback, new TypeError("argument should be string"))
    }
}
fs.readFile(path.resolve(__dirname, "mypromise.js"), (err, data) => {
    setTimeout(() => {
        console.log("io after setTimeout")
    }, 0);

    setImmediate(() => {
        console.log("io after setImmediate")
    });
    process.nextTick(() => {
        console.log("io after nextTick");
    });
})


setTimeout(() => {
    console.log("setTimeout1")
    new Promise((res) => { res(1) }).then(res => { console.log("Promise1", res) })
}, 0);
setTimeout(() => {
    console.log("setTimeout2")
    new Promise((res) => { res(2) }).then(res => { console.log("Promise2", res) })
}, 0);