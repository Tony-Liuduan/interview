/**
 * @fileoverview 022 复杂链表的复制
 * @author liuduan
 * @Date 2020-05-27 13:46:21
 * @LastEditTime 2020-05-27 14:36:13
 * https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/
 */
function Node(val, next, random) {
    this.val = val;
    this.next = next || null;
    this.random = random || null;
}
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList1 = function (head) {
    // 1. 复制每一个节点到到当前节点的next
    let cur = head;
    while (cur) {
        let node = new Node(cur.val);
        let next = cur.next;
        cur.next = node;
        node.next = next;
        cur = next;
    }

    cur = head;
    // 2. 整下random
    while (cur) {
        let {
            random,
        } = cur;
        let node = cur.next;
        node.random = random ? random.next : null;
        cur = node.next;
    }

    cur = head;
    let copy = null;
    // 3. 组装链表
    while (cur) {
        let node = cur.next;
        let next = node.next;
        if (!copy) {
            copy = node;
        }
        node.next = next ? next.next : null;
        cur.next = next;
        cur = next;
    }

    return copy;

};


/**
 * @param {Node} head
 * @return {Node}
 * 通过hashmap实现
 */
var copyRandomList2 = function (head) {
    if (!head) return null;
    let map = new WeakMap();
    let cur = head;
    while (cur) {
        if (!map.has(cur)) {
            let node = new Node(cur.val);
            map.set(cur, node);
        }

        let {
            next,
            random,
        } = cur;
        if (next && !map.has(next)) {
            map.set(next, new Node(next.val));
        }
        if (random && !map.has(random)) {
            map.set(random, new Node(random.val));
        }

        map.get(cur).next = next ? map.get(next) : null;
        map.get(cur).random = random ? map.get(random) : null;

        cur = next;
    }

    return map.get(head);
};


/**
 * @param {Node} head
 * @return {Node}
 * 通过hashmap & bfs 广度优先遍历
 */
var copyRandomList3 = function (head) {
    if (!head) return null;

    function bfs(head) {
        let map = new WeakMap();
        let copyhead = new Node(head.val);
        map.set(head, copyhead);

        let queue = [head];

        while (queue.length) {
            let node = queue.pop();

            let {
                next,
                random,
            } = node;

            if (next && !map.has(next)) {
                queue.unshift(next);
                map.set(next, new Node(next.val));
            }

            if (random && !map.has(random)) {
                queue.unshift(random);
                map.set(random, new Node(random.val));
            }

            map.get(node).next = next ? map.get(next) : null;
            map.get(node).random = random ? map.get(random) : null;
        }

        return copyhead;
    }

    return bfs(head);
};



/**
 * @param {Node} head
 * @return {Node}
 * 通过hashmap & dfs 深度优先遍历
 */
var copyRandomList4 = function (head) {
    if (!head) return null;

    let map = new WeakMap();

    function dfs(head) {
        if (!head) {
            return null;
        }

        if (map.has(head)) {
            return map.get(head);
        }

        let node = new Node(head.val);

        map.set(head, node);

        node.next = dfs(head.next);
        node.random = dfs(head.random);

        return node;
    }

    return dfs(head);
};