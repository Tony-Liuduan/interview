/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-23 16:44:28
 * @LastEditTime 2020-07-23 17:49:34
 */
window.onload = function () {
    var ws = new WebSocket("ws://localhost:3000");
    var oText = document.getElementById('message');
    var oSend = document.getElementById('send');
    var oUl = document.getElementsByTagName('ul')[0];
    ws.onopen = function () {
        console.log('open')
        oSend.onclick = function () {
            if (!/^\s*$/.test(oText.value)) {
                ws.send(oText.value);
            }
        };
    };
    ws.onmessage = function (msg) {
        var str = "<li>" + msg.data + "</li>";
        oUl.innerHTML += str;
    };
    ws.onclose = function (e) {
        console.log("已断开与服务器的连接", e);
        ws.close();
    }
}