// window.onload = function () {
//     // drag处于绝对定位状态
//     let drag = document.getElementById("box");
//     drag.onmousedown = function (e) {
//         var e = e || window.event;
//         // 鼠标与拖拽元素边界的距离 = 鼠标与可视区边界的距离 - 拖拽元素与边界的距离
//         let diffX = e.clientX - drag.offsetLeft;
//         let diffY = e.clientY - drag.offsetTop;
//         drag.onmousemove = function (e) {
//             // 拖拽元素移动的距离 = 鼠标与可视区边界的距离 - 鼠标与拖拽元素边界的距离
//             let left = e.clientX - diffX;
//             let top = e.clientY - diffY;
//             // 避免拖拽出可视区
//             if (left < 0) {
//                 left = 0;
//             } else if (left > window.innerWidth - drag.offsetWidth) {
//                 left = window.innerWidth - drag.offsetWidth;
//             }
//             if (top < 0) {
//                 top = 0;
//             } else if (top > window.innerHeight - drag.offsetHeight) {
//                 top = window.innerHeight - drag.offsetHeight;
//             }
//             drag.style.left = left + "px";
//             drag.style.top = top + "px";
//         };
//         drag.onmouseup = function (e) {
//             this.onmousemove = null;
//             this.onmouseup = null;
//         };
//     };
// };





document.addEventListener('DOMContentLoaded', function () {
    let drag = document.getElementById("box");
    drag.addEventListener('mousedown', handleMousedown);


    /* 拖动时触发*/
    document.addEventListener("dragstart", function (event) {
        //dataTransfer.setData()方法设置数据类型和拖动的数据
        event.dataTransfer.setData("Text", event.target.id);
    });
    // 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    /*对于drop,防止浏览器的默认处理数据(在drop中链接是默认打开)
    利用dataTransfer.getData()方法获得拖放数据
    拖拖的数据元素id(“drag1”)
    拖拽元素附加到drop元素*/
    document.addEventListener("drop", function (event) {
        event.preventDefault();
        if (event.target.className == "droptarget") {
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
        }
    });


})

let diffX = 0;
let diffY = 0;


/* 

screenX/Y：鼠标位置相对于屏幕的坐标

pageX/Y：相对于文档边缘（包含滚动条距离）

clientX/Y：相对于当前页面且不包含滚动条距离

offsetX/Y：相对于当前元素（块或行内块），除safari外不包含边框。

其他：

X/Y：与clientX/Y相同，firefox不支持

layerX/Y：除IE外与pageX/Y相同，IE11下与clientX/Y相同。非官方属性。

*/

function handleMousedown(e) {
    // 
    let { clientX, clientY } = e;
    let target = e.target;
    diffX = clientX - target.offsetLeft;
    diffY = clientY - target.offsetTop;
    target.addEventListener('mousemove', handleMousemove);
    target.addEventListener('mouseup', handleMouseup);
}

function handleMousemove(e) {
    let { clientX, clientY } = e;
    let left = clientX - diffX;
    let top = clientY - diffY;

    if (left < 0) {
        left = 0;
    } else if (left > window.innerWidth - e.target.offsetWidth) {
        left = window.innerWidth - e.target.offsetWidth;
    }

    if (top < 0) {
        top = 0;
    } else if (top > window.innerHeight - e.target.offsetHeight) {
        top = window.innerHeight - e.target.offsetHeight;
    }

    e.target.style.left = left + 'px';
    e.target.style.top = top + 'px';

}

function handleMouseup(e) {
    e.target.removeEventListener('mousemove', handleMousemove);
    e.target.removeEventListener('mouseup', handleMouseup);
}