class Node {
    constructor(value, next) {
        this.value = value || null;
        this.next = next || null;
    }
}

class Linked {
    constructor() {
        this.size = 0;    // 队长
        this.head = null; // 队头
        this.rear = null; // 队尾
    }

    toString() {
        let node = this.head;
        let value = [];

        while (node) {
            value.push(node.value);
            node = node.next;
        }

        return value.join(',');
    }

    push(value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
        } else {
            this.rear.next = node;
        }

        this.rear = node;
        this.size = this.size + 1;
        return this;
    }

    pop() {
        this.delete(this.size - 1);
    }

    unshift(value) {
        const node = new Node(value, this.head);
        this.head = node;
        this.size = this.size + 1;
        return this;
    }

    shift() {
        this.delete(0);
    }

    delete(point) {
        if (!this.head) {
            return this;
        }

        if (point < 0 || point >= this.size) {
            return this;
        }

        let cursor = 0;

        let node = this.head;
        let preNode = null;

        if (point === 0) {
            this.head = this.head.next;
        } else {
            while (cursor++ < point) {
                preNode = node;
                node = node.next;
            }
            preNode.next = node.next;
        }

        if (this.rear === node) {
            this.rear = preNode;
        }

        console.warn("delete node is: ", node.value);

        this.size = this.size - 1;
        return this;
    }

    slice(start = 0, end) {
        if (!this.head) {
            return this;
        }

        if (start < 0 || start >= this.size) {
            return this;
        }

        if (end < 0) {
            end = this.size + end;
        }

        if (end < 0 || end >= this.size) {
            return this;
        }

        if (start >= end) {
            return this;
        }

        let node = this.head;
        let cursor = 0;
        let preNode = null;
        while (node && (cursor < end)) {
            if (cursor < start) {
                preNode = node;
            }
            cursor++;
            node = node.next;
        }

        if (preNode === null) {
            preNode = node.next;
            this.head = preNode;
        } else {
            preNode.next = node.next;
        }

        if (node.next === null) {
            this.rear = preNode;
        }

        this.size = this.size - (end - start + 1);

        return this;
    }

    insert(point, value) {
        if (!this.head) {
            return this;
        }

        if (point < 0 || point > this.size) {
            return this;
        }

        if (point === 0) {
            return this.unshift(value);
        }

        if (point === this.size) {
            return this.push(value);
        }

        let cursor = 0;

        let node = this.head;
        let preNode = null;

        while (cursor++ < point) {
            preNode = node;
            node = node.next;
        }
        preNode.next = new Node(value, node);

        this.size = this.size + 1;
        return this;
    }

    indexOf(value) {
        let node = this.head;
        let cursor = 0;
        while (node) {
            if (value === node.value) {
                return cursor;
            }
            cursor++;
            node = node.next;
        }

        return -1;
    }

    /**
     * @description: 反转
     * 输入: 1->2->3->4->5->NULL
     * 输出: 5->4->3->2->1->NULL
     * 
     */
    reverse() {
        let node = this.head;
        let preNode = null;
        this.rear = node;
        while(node) {
            const next = node.next;
            node.next = preNode;
            preNode = node;
            node = next;
        }
        this.head = preNode;
        return this;

        // 递归写法
        // this.rear = this.head;
        // const _r = (pre, cur) => {
        //     if (!cur) {
        //         this.head = pre;
        //         return pre;
        //     };
        //     let next = cur.next;
        //     cur.next = pre;
        //     pre = cur;
        //     return _r(cur, next);
        // }

        // return _r(null, this.head);
    }

    /**
     * @description: 区间反转
     * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
     * 输出: 1->4->3->2->5->NULL
     * 
     */
    reverseBetween(m, n) {
        let head = this.head;
        let front = new Node(null, head);
        // 先找到反转区间前置位
        for (let i = 0; i < m - 1; i++) {
            front = front.next;
        }
       
        // 开始反转区间
        let len = n - m;
        let pre = front.next;
        let cur = pre.next;
        for (let j = 0; j < len; j++) {
            const next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        } 

        let tail = front.next;
        tail.next = cur;
        front.next = pre;

        if (m === 1) {
            this.head = pre;
        }

        if (cur === null) {
            this.rear = tail;
        }

        return this;
    }

    /**
     * @description: 两个一组翻转链表
     * 给定 1 -> 2 -> 3 -> 4, 你应该返回 2 -> 1 -> 4 -> 3
     * 
     */
    swapPairs(head) {
        if (head === undefined) {
            head = this.head;
        }
        if (head === null || head.next === null) {
            return head;
        }
        let node1 = head, node2 = head.next;
        node1.next = this.swapPairs(node2.next);
        node2.next = node1;
        if (node1.next === null) {
            this.rear = node1;
        }
        this.head = node2;
        return node2;


        // 创建虚拟point点
        // const _vnode = vnode || new Node(null, this.head);

        // let nextNode = _vnode.next;
        // if (!nextNode) {
        //     return;
        // }

        // // get next.next 节点 head.next
        // let nextNextNode = nextNode.next;
        // if (!nextNextNode) {
        //     return;
        // }

        // nextNode.next = nextNextNode.next;
        // nextNextNode.next = nextNode;
        // _vnode.next = nextNextNode;

        // if (!vnode) {
        //     this.head = nextNextNode;
        // }

        // if (!nextNode.next) {
        //     this.rear = nextNode;
        // }

        // this.swapPairs(nextNode);
    }

    reverseKGroup(head, k = 4) {
        if (head === undefined) {
            head = this.head;
        }

        let node = head;
        for (let i = 0; i < k; i++) {
            if (node === null) {
                return head;
            }
            node = node.next;
        }

        node = head;
        let point = 0;
        let preNode = head;

        while (point++ < k) {
            let next = node.next;
            node.next = preNode;
            preNode = node;
            node = next;
        }

        head.next = this.reverseKGroup(node, k);

        if (node === null) {
            this.rear = head;
        }

        this.head = preNode;
        return preNode;
    }
}


module.exports = Linked;
