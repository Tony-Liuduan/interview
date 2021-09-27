/**
 * @fileoverview LRU 算法
 * @author liuduan
 * @Date 2020-06-14 18:12:58
 * @LastEditTime 2020-06-14 19:21:49
 * 
 * https://leetcode-cn.com/problems/lru-cache/
 * 
 * hash && 双向链表
 * head 端作为最近使用or添加的节点
 */

class Node {
    constructor(value, key, next, prev) {
        this.value = value || null;
        this.key = key;
        this.next = next || null;
        this.prev = prev || null;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.hashmap = {};
    // 构建一个双向链表，创建头尾空节点，方便读取操作
    // 设计 head 和 tail 的意义
    // 它们不存数据，只是为了让真实头结点和尾节点的操作和其他节点一样
    // 这样就能很快访问到双向链表的头和尾，所有操作也统一了，逻辑看起来更顺畅
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    let node = this.hashmap[key];
    if (!node) return -1;
    this.moveToLRUHead(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    let node = this.hashmap[key];
    // 如果关键字已经存在，则变更其数据值
    if (node) {
        node.value = value;
        this.moveToLRUHead(node);
    } else {
        // 如果关键字不存在，则插入该组「关键字/值」
        node = new Node(value, key);

        // 当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值
        if (this.size >= this.capacity) {
            this.removeLRULastNode();
        }

        // 更新hashmap && size
        this.size++;
        this.hashmap[key] = node;

        // 新增节点添加到头部
        this.unshift(node);
    }
};

// 将节点移动到头部
LRUCache.prototype.moveToLRUHead = function (node) { 
    this.delete(node) // 从链表中删除节点
    this.unshift(node) // 添加到链表的头部
};

// 删除链表节点 delete
LRUCache.prototype.delete = function (node) { 
    let _prev = node.prev;
    let _next = node.next;

    _prev.next = _next;
    _next.prev = _prev;
};

// 在链表头部插入节点 unshift
LRUCache.prototype.unshift = function (node) { 
    const _first = this.head.next;
    node.prev = this.head;
    node.next = _first;
    this.head.next = node;
    _first.prev = node;
};

// 删除链表尾部节点pop
LRUCache.prototype.pop = function () {
    let removeNode = this.tail.prev;
    this.delete(removeNode);
    return removeNode;
};

LRUCache.prototype.removeLRULastNode = function () {
    let removeNode = this.pop();
    this.size--;
    delete this.hashmap[removeNode.key];
    removeNode = null;
}






/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */