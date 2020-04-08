// 创建同步迭代器
function createSyncIterator(obj) {
    let keys = Object.keys(obj);
    let len = keys.length;
    let point = 0;

    return {
        next() {
            var done = point >= len;
            var value = !done ? obj[keys[point++]] : undefined;
            return {
                value,
                done,
            }
        }
    }
}

var si = createSyncIterator([8, 9, 10]);
console.log(si.next());
console.log(si.next());
console.log(si.next());



var objs = {
    age: 18,
    sex: "man",
    [Symbol.iterator]() {
        let me = this;
        let keys = Object.keys(me);
        let len = keys.length;
        let point = 0
        return {
            next() {
                let done = point >= len;
                let value = !done ? me[keys[point++]] : undefined;
                return {
                    value,
                    done,
                }
            }
        }
    }
}

for (const iterator of objs) {
    console.log(iterator);
}




let objx = {
    *[Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
};

for (let x of objx) {
    console.log(x);
}



/* --------------------------------------------------------------------------- */

// 模拟异步迭代器
const obj = {
    age: 18,
    sex: "man",
    [Symbol.asyncIterator]() {
        let me = this;
        let keys = Object.keys(me);
        let len = keys.length;
        let cur = 0;
        return {
            next() {
                let done = cur >= len;
                let value = !done ? me[keys[cur++]] : undefined;
                return new Promise(resolve => {
                    // 模拟异步
                    setTimeout(() => {
                        resolve({
                            value,
                            done,
                        });
                    }, 0);
                });
            }
        }
    }
}

async function fn() {
    // es9 语法 异步迭代
    for await (const v of obj) {
        console.log(v);
    }
}

fn();


// 异步迭代生成器
async function* generatorIterator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

const ai = generatorIterator();

async function fn1() {
    // es9 语法 异步迭代
    for await (const v of ai) {
        console.log(v);
    }
}

fn1();


var o = {
    1: 1,
    2: 2,
    length: 3
}

o[Symbol.iterator] = [][Symbol.iterator];

for (const iterator of o) {
    console.log(iterator)
}