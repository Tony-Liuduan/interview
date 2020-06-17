/**
 * @fileoverview 037 删除链表节点
 * @author liuduan
 * @Date 2020-06-17 11:41:08
 * @LastEditTime 2020-06-17 11:41:26
 * https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var deleteNode = function (head, val) {
    let vnode = new ListNode();
    vnode.next = head;
    let cur = vnode.next;
    let prev = vnode;

    while (cur) {
        let next = cur.next;
        let _val = cur.val;
        if (val === _val) {
            prev.next = next;
        }
        prev = cur;
        cur = next;
    }


    return vnode.next;

};