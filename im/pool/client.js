/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-23 15:31:22
 * @LastEditTime 2020-07-23 16:22:54
 */



const longPolling = function (url, method = 'get', data = null) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.withCredentials = true;
    // xhr.responseType = 'blob'
    xhr.send(data);

    // xhr.timeout = 3000; // 设置最长等待时间设为3000毫秒。过了这个时限，就自动停止HTTP请求。
    // xhr.ontimeout = function (event) {
    //     console.log('timeout', event);
    //     alert('请求超时！');
    // }

    xhr.onreadystatechange = function () {
        // var result;
        if (xhr.readyState == 3) {
            console.log('onreadystatechange', xhr.responseText);
        }
    }

    // 监听文件响应/下载进度，可监控 3~4，先于onload事件触发
    xhr.onprogress = function (e) {
        console.log('onprogress', e, e.lengthComputable);
        if (e.lengthComputable) {
            console.log('onprogress', e.loaded / e.total);
        }
    };

    xhr.onload = function () {
        // console.log('xhr.onload', xhr.readyState, xhr) // 4
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            // 响应二进制
            // var blob = new Blob([xhr.response], { type: 'application/json' });
            // console.log(blob.text().then(res => {
            //     console.log(res);
            // }));

        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
}


longPolling('/stream')