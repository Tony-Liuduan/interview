/* 
3. 地图光点

通过调用第三方地图接口会不断给我们推入当前用户的物理坐标定位(x， y),产品需求如下：
当前界面上至多展示5个光点，当第6个坐标推入，展示第6个光点这时第1个光点若存在则消失。
当第7个坐标推入，展示第7个光点这时第2个光点若存在则消失。
当第8个坐标推入，展示第8个光点这时第3个光点若存在则消失。
依次类推。每个光点只展示5秒，当没有新的光点挤掉它并且出现超过5秒则自动消失，故临界值为若无坐标推入，界面上最后无光点。

请从算法角度设计该业务场景如何实现，并提供代码实现（不要求跑通，但要写明实现思路）

*/
class Queue {
    constructor(queue, limitLen = Infinity) {
        this.queue = queue || [];
        this.limitLen = limitLen;
    }

    // 获取队长度
    size() {
        return this.queue.length;
    }

    // 入队操作
    push(element) {
        if (!element) {
            return this;
        }
        if (this.size() >= this.limitLen) {
            this.pop();
        }
        this.queue.push(element);
        return this;
    }

    // 出队操作
    pop() {
        const die = this.queue[0];
        (die.timer !== undefined) && clearTimeout(die.timer);
        die.isActive = false;
        this.queue.shift();
        return this;
    }

    // 清空队列
    clear() {
        this.queue = [];
        return this;
    }

    // 获取队首
    getHead() {
        return this.queue[0];
    }

    // 获取队尾
    getRear() {
        return this.queue[this.size() - 1]
    }

    // 弹出过期的元素
    emit(element, isAcive) {
        if (isAcive) {
            return this.queue;
        }

        let point = this.queue.findIndex(el => el === element);

        if (point < 0) {
            return this.queue;
        }

        console.log(this.queue.length)

        const dieList = this.queue.splice(0, point + 1);

        dieList.forEach(die => {
            if (die) {
                (die.timer !== undefined) && clearTimeout(die.timer);
                die.isActive = false;
            }
        });

        console.log(this.queue.length);
        console.log("____________________________")
        return this.queue;
    }
}



class Coordinate {
    constructor({ x, y }, limit = 5 * 1000) {
        this.x = x;
        this.y = y;
        this.limit = limit;
        this.isActive = false;
        this.timer;
    }

    invoke() {
        this.isActive = true;
        return this.addevent();
    }

    addevent() {
        return new Promise(resolve => {
            const isActive = this.isActive;
            if (isActive === false) {
                resolve(false);
                return;
            }
            if (this.limit <= 0) {
                resolve(false);
                return;
            }
            if (this.limit === Infinity) {
                resolve(true);
                return;
            }
            this.timer = setTimeout(() => {
                clearTimeout(this.timer);
                console.log("______________setTimeout______________")
                resolve(false);
            }, this.limit);
        });
    }
}

const queue = new Queue([], 5);
function addCoordinate(node) {
    setTimeout(() => {
        const data = new Coordinate(node);
        queue.push(data);
        data.invoke().then(isActive => {
            queue.emit(data, isActive);
        })
    }, 100);
}



addCoordinate({
    x: 1,
    y: 1,
});

addCoordinate({
    x: 2,
    y: 3,
});

addCoordinate({
    x: 4,
    y: 5,
});

addCoordinate({
    x: 7,
    y: 8,
});

addCoordinate({
    x: 9,
    y: 10,
});

addCoordinate({
    x: 100,
    y: 110,
});