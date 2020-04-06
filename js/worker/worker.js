onmessage = function (e) {
    console.log("worker", e.data);
    const buf = e.data;
    // console.log(buf[0]);
    // buf[0] = 100;

    Atomics.wait(buf, 11, 11, /* 3000 */);  // 条件满足进入休眠状态, 3秒后唤醒
    console.log("我调用了Atomics.wait， 我进入休眠状态了，下面的代码都不会被执行了");

    // 多线程使用原子操作 Atomics.store 更新数据
    Atomics.store(buf, 0, 88);
    postMessage("hello main")
}