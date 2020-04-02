// HTML，JS禁止鼠标右键、禁止全选、复制、粘贴的方法
// 禁止鼠标右键、禁止全选、复制、粘贴；

// oncontextmenu事件禁用右键菜单；
// js代码：

document.oncontextmenu = function (event) {
    event.returnValue = false;
}
// 或者直接返回整个事件
document.oncontextmenu = function () {
    return false;
}
// onselectstart事件禁用网页上选取的内容；
// js代码：

document.onselectstart = function (event) {
    event.returnValue = false;
}
// 或者直接返回整个事件
document.onselectstart = function () {
    return false;
}
// oncopy事件禁用复制；
// js代码：

document.oncopy = function (event) {
    event.returnValue = false;
}
// 或者直接返回整个事件
document.oncopy = function () {
    return false;
}
// 以上三种事件，如果只想单纯的禁用鼠标右键，和复制粘贴，还可以将它们直接写到HTML中的body上面；


 

// 禁用鼠标事件

document.onmousedown = function (e) {
    if (e.which == 2) {// 鼠标滚轮的按下，滚动不触发
        return false;
    }
    if (e.which == 3) {// 鼠标右键
        return false;
    }
}
// 禁用键盘中的ctrl、alt、shift

document.onkeydown = function (event) {
    if (event.ctrlKey) {
        return false;
    }
    if (event.altKey) {
        return false;
    }
    if (event.shiftKey) {
        return false;
    }
}



// 一个更简单的方法就是在 <body> 中加入如下的代码, 这样鼠标的左右键都失效了.
// topmargin = "0"
// oncontextmenu = "return false" 
// ondragstart = "return false" 
// onselectstart = "return false" 
// onselect = "document.selection.empty()"
// oncopy = "document.selection.empty()" 
// onbeforecopy = "return false"
// onmouseup = "document.selection.empty()"



// 禁止网页另存为：在 <body> 后面加入以下代码：测试无效、
/* <noscript>
    <iframe src=""></iframe>
</noscript> */