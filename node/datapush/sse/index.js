function init() {
    var source = new EventSource('/api');

    source.onopen = function () {
        //readyState  一个 unsigned short 值，代表连接状态。可能值是 CONNECTING (0), OPEN (1), 或者 CLOSED (2)。
        console.log('连接已建立', this.readyState);
    }
    source.onmessage = function (e) {
        console.log('get data from server', e.data);

        setTimeout(() => {
            // 主动关闭连接
            source.close();
        }, 3000);
    }
    source.onerror = function (err) {
        console.error(err, this.readyState); // 0
    }
}

init();