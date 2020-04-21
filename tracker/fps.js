var lastTime = performance.now();
var frame = 0;
var lastFameTime = performance.now();
var loop = function (time) {
    var now = performance.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);
    frame++;
    if (now - lastTime > 1000) {
        fps = Math.round((frame * 1000) / (now - lastTime));
        lastTime = now;
        frame = 0;
    }

    lastFameTime = now;

    window.requestAnimationFrame(loop);
};
loop();
function aaa() {
    console.log('start aaaa ________________-')
    var ls = new Array(100000);
    ls.fill('1');
    ls.forEach((item, i) => {
        let li = document.createElement('li');
        li.innerHTML = i + 1;
        document.body.appendChild(li);
    });
    console.log('end aaaa ________________')
}

aaa();