/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-29 14:41:05
 * @LastEditTime 2020-07-30 14:36:03
 */

const canvas = document.getElementById('js-canvas');
const vcanvas = document.getElementById('js-v-canvas');

const ctx = canvas.getContext('2d');
const vctx = vcanvas.getContext('2d');


// 缓存图形,维护图形与颜色对应的color
let graphMap = {};
// 缓存上一次坐标点信息对象
let lastGraph = null;
// 缓存当前选择图形颜色，指的是隐藏canvas的图形颜色
let selectedColor;
// 鼠标按下是否选中的是顶点坐标
let isVertex = false;

// 起始绘制坐标点
const points = [
    {
        x: 50,
        y: 50,
    },
    {
        x: 100,
        y: 75,
    },
    {
        x: 100,
        y: 25,
    },
];

// 定义画布大小
vctx.width = ctx.width = canvas.width = vcanvas.width = 800;
vctx.height = ctx.height = canvas.height = vcanvas.height = 800;


initDraw(ctx, vctx, points, '#ccc', false, 6);
function initDraw(ctx, vctx, points, color, isFill, lineWidth) {
    // 初始化颜色
    let uniqColor = generatorColor();
    // 判断颜色是否已经使用过，如果已经有了 那么就重新更新颜色
    while (graphMap[uniqColor]) {
        uniqColor = generatorColor();
    }

    graphMap[uniqColor] = {
        points,
        color,
        isFill,
        lineWidth,
    }

    drawGraph(uniqColor, ctx, vctx, points, color, isFill, lineWidth);//绘制可视化的画
}
function drawGraph(uniqColor, ctx, vctx, points, color, isFill, lineWidth) {
    draw(ctx, points, color, isFill, lineWidth);
    draw(vctx, points, uniqColor, isFill, lineWidth + 10);
}
function draw(ctx, points, color, isFill, lineWidth) {
    ctx.clearRect(0, 0, ctx.width, ctx.height); // 清空画布
    ctx.save(); // 储存当前状态，填充颜色 字体... 不包括绘制图形
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round'; // 定义两条线交汇时的边角类型（miter 尖角默认 bevel斜角 round 圆角 ）
    color && isFill ? (ctx.fillStyle = color) : (ctx.strokeStyle = color);
    ctx.beginPath();
    points.forEach(({ x, y }, i) => {
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    })
    ctx.closePath();
    isFill ? ctx.fill() : ctx.stroke();
    ctx.restore(); // 恢复上一次的状态
}




canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
function handleMouseDown(e) {
    let { x, y } = e;
    // 获取隐藏层point颜色 ctx.getImageData(sx, sy, sw, sh);
    const colorData = vctx.getImageData(x, y, 1, 1).data;
    const hex = rgb2Hex(colorData[0], colorData[1], colorData[2]);
    const graphData = graphMap[hex];

    if (!graphData) {
        return
    }

    let { points } = graphData;
    for (const { x: ox, y: oy } of points) {
        if (Math.abs(ox - x) < 5 && Math.abs(oy - y) < 5) {
            x = ox;
            y = oy;
            isVertex = true;
            break;
        }
    }

    selectedColor = hex;
    lastGraph = {
        x,
        y,
        color: graphData.color,
    };

    graphData.color = '#ff0000'; // 选中更新边框颜色
    drawGraph(selectedColor, ctx, vctx, graphData.points, graphData.color, graphData.isFill, graphData.lineWidth);
}

function handleMouseMove(e) {
    const { x, y } = e;

    const graphData = graphMap[selectedColor];

    if (!lastGraph || !graphData) {
        return;
    }

    let moveX = x - lastGraph.x;
    let moveY = y - lastGraph.y;

    let { points } = graphData;

    let newPoints = points.map(({ x, y }) => {
        if (isVertex) {
            if (x === lastGraph.x && y === lastGraph.y) {
                return {
                    x: x + moveX,
                    y: y + moveY,
                }
            }
            return {
                x,
                y,
            }
        }
        return {
            x: x + moveX,
            y: y + moveY,
        }
    });

    graphData.points = newPoints;

    drawGraph(selectedColor, ctx, vctx, newPoints, graphData.color, graphData.isFill, graphData.lineWidth);

    lastGraph.x = x;
    lastGraph.y = y;
}

function handleMouseUp(e) {
    if (!lastGraph) {
        return;
    }

    const color = lastGraph.color;

    lastGraph = null;

    const graphData = graphMap[selectedColor];
    if (!graphData) {
        return
    }

    // 恢复颜色
    graphData.color = color
    drawGraph(selectedColor, ctx, vctx, graphData.points, color, graphData.isFill, graphData.lineWidth);

    selectedColor = undefined;
    isVertex = false;
}


/**
 * @description 随机获取16进制颜色值
 * @return {string} 16进制color值
 */
function generatorColor() {
    const str = '0123456789abcdef';

    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += str[(Math.random() * 16 >> 0)]
    }
    return color;
}
/**
 * @description rgb 转 16进制
 * @param {number} r 
 * @param {number} g
 * @param {number} b
 * @return {string} 16进制color值
 */
function rgb2Hex(r, g, b) {
    return [r, g, b].reduce((x, y) => x + compute2Hex(y), '#');
}
function compute2Hex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

















/**
 * @description 测试 ctx.save / ctx.restore 方法
 */
function test(ctx) {
    //初始的样式（绘制状态）并绘制矩形
    ctx.fillStyle = '#FA6900';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(204, 204, 204, 0.5)';
    ctx.fillRect(20, 20, 150, 150);
    ctx.save(); //保存上述设置的绘制状态

    //重新定义新的绘制状态，并绘制矩形
    ctx.fillStyle = '#E0E4CD';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(204, 204, 204, 0.5)';
    ctx.fillRect(200, 200, 30, 150);
    // ctx.save(); 

    // 绘制完之后，恢复到初始的绘制状态，继续进行绘画。并绘制圆形，并不会恢复初始状态下绘制的矩形。
    ctx.restore();
    ctx.beginPath();
    ctx.arc(305, 75, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(300, 300, 30, 150);
}