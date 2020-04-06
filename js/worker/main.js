const worker = new Worker("./worker.js");


// worker.postMessage("发送给worker进程")
worker.onmessage = function (e) {
    console.log("main", e.data);
    // console.log(intArrayBuf[0]);
    console.log(Atomics.load(intArrayBuf, 0), Atomics.load(intArrayBuf, 1));
}

const sharedBuf = new SharedArrayBuffer(1024); // 1024 byte === 1kb 内存
// 建立视图
const intArrayBuf = new Int32Array(sharedBuf);
for (let index = 0; index < intArrayBuf.length; index++) {
    intArrayBuf[index] = index;
}

Atomics.add(intArrayBuf, 1, 1);
Atomics.sub(intArrayBuf, 1, 1);

worker.postMessage(intArrayBuf);


setTimeout(() => {
    // intArrayBuf
    // 参数2：视图位置
    // 参数3：唤醒的进程数，默认 Infinity
    Atomics.notify(intArrayBuf, 11, 1);
}, 2000);