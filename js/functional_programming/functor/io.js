// IO 跟之前的 functor 不同的地方在于，它的 __value 总是一个函数
function compose(...fns) {
    return fns.reduce((fa, fb) => (...args) => fa(fb(...args)))
}

var IO = function (f) {
    this.__value = f;
}
IO.of = function (x) {
    return new IO(function () {
        return x;
    });
}
IO.prototype.map = function (f) {
    return new IO(compose(f, this.__value));
}


// io_window_ :: IO Window
var io_window = new IO(function () {
    return window;
});
io_window.map(function (win) {
    return win.innerWidth
});
// IO(1430)
io_window.map(_.prop('location')).map(_.prop('href')).map(split('/'));
// IO(["http:", "", "localhost:8000", "blog", "posts"])
// $ :: String -> IO [DOM]
var $ = function (selector) {
    return new IO(function () {
        return document.querySelectorAll(selector);
    });
}
$('#myDiv').map(head).map(function (div) { return div.innerHTML; });
// IO('I am some inner html')