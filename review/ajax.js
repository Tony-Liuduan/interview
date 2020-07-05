/**
 * @fileoverview ajax
 * @author liuduan
 * @Date 2020-06-17 15:01:53
 * @LastEditTime 2020-06-30 09:31:09
 */
function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/bar/foo.txt", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

// 超时 timeout onload onprocess wiht