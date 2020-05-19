/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-05-19 16:59:54
 * @LastEditTime 2020-05-19 17:36:32
 * https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
 * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
 * 分别完成在队列尾部插入整数和在队列头部删除整数的功能。
 * (若队列中没有元素，deleteHead 操作返回 -1 )
 * 
 */
var CQueue = function (list) {
    this.queue = list;
    this.stack1 = [...list];
    this.stack2 = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
    this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
    // if (!this.stack1.length) return -1;
    
    // this.stack2 = [];
    // while (this.stack1.length) {
    //     this.stack2.push(this.stack1.pop());
    // }
    
    // const item = this.stack2.pop();
    // while (this.stack2.length) {
    //     this.stack1.push(this.stack2.pop());
    // }
    // return item;
    
    if (this.stack2.length) {
        return this.stack2.pop()
    }
    if (!this.stack1.length) return -1;
    while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
};