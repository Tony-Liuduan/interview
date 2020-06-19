// 老版本的XMLHttpRequest对象, 这个接口一直没有标准化，每家浏览器的实现或多或少有点不同
// 缺点：
// 1. 只支持文本数据的传送，无法用来读取和上传二进制文件。
// 2. 传送和接收数据时，没有进度信息，只能提示有没有完成。
// 3. 受到"同域限制"（Same Origin Policy），只能向同一域名的服务器请求数据。
function ajax1(options) {
    // 0. 新建一个XMLHttpRequest的实例
    var xhr = new XMLHttpRequest(); // readyState=0

    // 监控XMLHttpRequest对象的状态变化，可监控 1~4
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                // DOMString
                alert(xhr.responseText);

                // 如果响应的是二进制数据需要转换，改写数据的MIMEType，将服务器返回的二进制数据伪装成文本数据，并且告诉浏览器这是用户自定义的字符集。
                // xhr.overrideMimeType("text/plain; charset=x-user-defined");
                // var binStr = xhr.responseText;
                // // 再把文本还原成二进制
                // for (var i = 0, len = binStr.length; i < len; {
                //     var c = binStr.charCodeAt(i);
                //     var byte = c & 0xff;
                // }
            } else {
                // DOMString
                alert(xhr.statusText);
            }
        }
    };

    // 1. 向远程主机发出一个HTTP请求
    xhr.open('GET', 'https://xhr.spec.whatwg.org', true); // readyState=1

    // xhr.setRequestHeader();
    // 2. 发送请求
    xhr.send(); // readyState=2, 响应头也已经被接收, xhr.status=200
}

// ajax1();



/* -------------------------------------------------------------------------------- */


// XMLHttpRequest Level 2, 被W3C标准化
// 改进：
// 1. 可以设置HTTP请求的时限。
// 2. 可以使用FormData对象管理表单数据。
// 3. 可以上传文件。
// 4. 可以请求不同域名下的数据（跨域请求）。跨域资源共享（CORS）
// 5. 可以获取服务器端的二进制数据。
// 6. 可以获得数据传输的进度信息。
function ajax2(options) {
    // 0. 新建一个XMLHttpRequest的实例
    var xhr = new XMLHttpRequest(); // readyState=0

    xhr.timeout = 3000; // 设置最长等待时间设为3000毫秒。过了这个时限，就自动停止HTTP请求。
    xhr.ontimeout = function (event) {
        console.log('timeout', event);
        alert('请求超时！');
    }

    // 监控XMLHttpRequest对象的状态变化，可监控 1~4，先于onprogress事件触发
    xhr.onreadystatechange = function () {
        console.log('onreadystatechange', xhr.readyState, xhr.status, xhr.statusText, xhr.responseType);
    };

    // 监听文件响应/下载进度，可监控 3~4，先于onload事件触发
    xhr.onprogress = updateProgress;
    // 监听文件上传进度
    xhr.upload.onprogress = updateProgress;
    function updateProgress(event) {
        if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
        }
    }


    // 响应处理，onload事件在事件队列中最后执行
    xhr.onload = function () {
        console.log('onload DONE', xhr.readyState); // readyState 为 4
        if (xhr.status == 200) {
            // DOMString
            // alert(xhr.responseText);

            // 接收二进制数据，注意，是读取xhr.response，而不是xhr.responseText。
            // 1. responseType = 'blob'
            // var blob = new Blob([xhr.response], { type: 'image/png' });

            // 2. responseType = 'arraybuffer'
            // var arrayBuffer = xhr.response;
            // if (arrayBuffer) {
            //     var byteArray = new Uint8Array(arrayBuffer);
            //     for (var i = 0; i < byteArray.byteLength; i++) {
            //         // do something
            //     }
            // }
        } else {
            // DOMString
            alert(xhr.statusText);
        }
    };


    // 使用formData时，必须是POST请求，content-type自定改为multipart/form-data;
    var form = document.getElementById('myform');
    var formData = new FormData(form);
    formData.append('username', '张三');
    formData.append('id', 123456);
    // 上传文件
    // for (var i = 0; i < files.length; {
    //     formData.append('files[]', files[i], 'filename');
    // }

    // formData 自带 迭代器[Symbol.iterator]属性
    for (const iterator of formData) {
        console.log(iterator)
    }

    // 1. 向远程主机发出一个HTTP请求
    xhr.open('POST', form.action, true); // readyState=1

    // xhr.setRequestHeader(key, value)

    // cors cookie, 在同一个站点下使用withCredentials属性是无效的
    xhr.withCredentials = true;


    // 如果是接收二进制数据
    // blob表示服务器传回的是二进制对象
    // xhr.responseType = 'blob';
    // // or 把二进制数据装在一个数组里
    // xhr.responseType = "arraybuffer";

    // xhr.setRequestHeader();
    // 2. 发送请求
    xhr.send(formData); // readyState=2, 响应头也已经被接收, xhr.status=200


    /**
     * xhr.response：返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应体（response body）
     * xhr.readyState：XMLHttpRequest对象的状态，等于4表示数据已经接收完毕。0-尚未调用 open() 方法，1-open() 方法已经被调用，2-send() 方法已经被调用，并且头部和状态已经可获得，3-responseText 属性已经包含部分数据，4-下载操作已完成
     * xhr.status：返回一个无符号短整型（unsigned short）数字，代表请求的响应状态
     * xhr.responseType：用于定义响应类型的枚举值（enumerated value）
     * xhr.responseText：返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 null
     * xhr.responseXML：返回一个 Document，其中包含该请求的响应，如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML，则返回 null
     * xhr.statusText：服务器返回的状态文本，它包含完整的响应状态文本（例如，404是"NOT FOND"）
     */
}

ajax2();
