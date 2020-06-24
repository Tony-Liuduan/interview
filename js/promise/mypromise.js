const PADDING = 'padding';
const FULFILLED = 'fulfilled';
const REJECT = 'reject';



function isObject(value) {
    const t = typeof value;
    return (t === "object" || t === "function") && value !== null;
}

function isPromiseInstance(value) {
    return MyPromise[Symbol.hasInstance](value);
}

function isThenable(value) {
    return isObject(value) && (typeof value.then === "function");
}

function resolvePromise(promise1, res, resolve, reject) {
    // 防止循环引用
    if (promise1 === res) {
        throw new Error("不可以循环引用promise");
    }

    // 处理res是promise实例情况
    if (isPromiseInstance(res)) {
        resolvePromiseInstant(promise1, res, resolve, reject)
        return;
    }

    resolvePromiseThenable(promise1, res, resolve, reject);
}

function resolvePromiseInstant(promise1, res, resolve, reject) {
    if (!isPromiseInstance(res)) {
        return false;
    }

    if (res.status === PADDING) {
        res.then((r) => {
            resolvePromise(promise1, r, resolve, reject)
        }, reject);
        return true;
    }

    if (res.status === FULFILLED) {
        resolve(res.value);
        return true;
    }

    reject(res.reason);
    return true;
}

function resolvePromiseThenable(promise1, res, resolve, reject) {
    // 处理res是thenable情况
    if (isThenable(res)) {
        res.then((r) => {
            resolvePromise(promise1, r, resolve, reject)
        }, reject);
    } else {
        resolve(res);
    }
}

function MyPromise(executer) {
    this.status = PADDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolveQueue = [];
    this.rejectQueue = [];

    let that = this;

    function resolve(value) {
        // 处理value是promise实例
        if (isPromiseInstance(value) || isThenable(value)) {
            resolvePromise(that, value, resolve, reject)
            return;
        }

        // 模拟微任务
        setTimeout(() => {
            // 保证只有第一个resolve生效，即状态变化后是不可修改的
            if (that.status === PADDING) {
                that.status = FULFILLED;
                that.value = value;
                for (const fn of that.resolveQueue) {
                    fn(value);
                }
            }
        }, 0);
    }

    function reject(reason) {
        setTimeout(() => {
            if (that.status === PADDING) {
                that.status = REJECT;
                that.reason = reason;
                for (const fn of that.rejectQueue) {
                    fn(reason);
                }
            }
        }, 0);
    }

    try {
        executer(resolve, reject);
    } catch (err) {
        reject(err);
    }
}


MyPromise.prototype.then = function (onFulfilled, onReject) {

    let newPromise;

    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onReject = typeof onReject === "function" ? onReject : e => {
        throw e;
    };

    // padding 状态处理，推入队列等待处理
    if (this.status === PADDING) {
        // 实现链式调用then
        return newPromise = new MyPromise((resolve, reject) => {
            this.resolveQueue.push((value) => {
                try {
                    const res = onFulfilled(value);
                    resolvePromise(newPromise, res, resolve, reject);
                } catch (e) {
                    console.log(e);
                    reject(e)
                }
            });
            this.rejectQueue.push((reason) => {
                try {
                    const res = onReject(reason);
                    resolvePromise(newPromise, res, resolve, reject);
                } catch (e) {
                    console.log(e);
                    reject(e)
                }
            });
        });
    }

    // fulfilled 状态处理
    if (this.status === FULFILLED) {
        return newPromise = new MyPromise((resolve, reject) => {
            try {
                const res = onFulfilled(this.value);
                resolvePromise(newPromise, res, resolve, reject);
            } catch (e) {
                reject(e)
            }
        });
    }

    // reject 状态处理
    if (this.status === REJECT) {
        return newPromise = new MyPromise((resolve, reject) => {
            try {
                const res = onReject(this.reason);
                resolvePromise(newPromise, res, resolve, reject);
            } catch (e) {
                reject(e)
            }
        });
    }
}



MyPromise.all = function (list) {
    return new MyPromise((resolve, reject) => {
        let l = list.length;
        let result = [];
        let cur = 0;
        let error = false;

        function onResolve(i, res) {
            cur++;
            result[i] = res;
            if (cur === l) {
                resolve(result);
            }
        }

        function onReject(reason) {
            error = true;
            reject(reason);
        }

        for (let i = 0; i < l; i++) {
            if (error) {
                break;
            }
            list[i].then(onResolve.bind(null, i), onReject);
        }
    })

}


// const pp = new MyPromise((res, rej) => {
//     setTimeout(() => {
//         res(new MyPromise(re => {
//             re(1000);
//         }));
//         // res({
//         //     then(r2) {
//         //         r2(new MyPromise(res => res(11111)))
//         //     }
//         // })
//         // res({
//         //     a: 1
//         // });
//         // rej("error")
//     }, 200);
// })
//     .then(res => {
//         console.log(res);
//         return {
//             then(r1) {
//                 r1({
//                     then(r2) {
//                         r2(new MyPromise(res => res(999)))
//                     }
//                 })
//             }
//         }
//     }, (e) => {
//         console.log(e);
//         return "cuowu";
//     })
//     .then(res => {
//         console.log(res);
//         // return pp;

//     })



// MyPromise.all([
//     new MyPromise(res => res(1)),
//     new MyPromise(res => res(2)),
// ])
//     .then(res => {
//         console.log(res)
//     })



// 测试：resolve处于resolve状态的then方法执行情况
// const po = new MyPromise((resolve, reject) => {
//     resolve("test async resolve");
// });

// setTimeout(() => {
//     po.then(res => {
//         console.log(res);
//     })

//     po.then(res => {
//         console.log(res);
//     })
// }, 0);


/**
 *  promise 终极变态题
 *  chrome 和 node 执行结果不一样哦
 */
function async1() {
    console.log("async1 start");
    new Promise(resolve => {
        // async2().then(resolve);
        resolve(async2());
        // resolve处理thenable对象时，会多包裹一层new Promise 
        // resolve(async2()) 等同于下面的代码
        // async2()
        //     .then((data) => {
        //         new Promise(res => {
        //             res()
        //         })
        //         .then(resolve)
        //     })
    })
        .then((res) => {
            console.log("++++++++++++++");
            console.log(res);
            console.log("async1 end");
            console.log("++++++++++++++");
        })
}
function async2() {
    return new Promise(resolve => {
        console.log('async2');
        resolve(1);
    })
    // return {
    //     then(resolve) {
    //         console.log('async2');
    //         resolve(1);
    //     }
    // }
}
async1()
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
}).then(function () {
    console.log("promise3");
}).then(function () {
    console.log("promise4");
});