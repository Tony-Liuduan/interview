/**
 * @fileoverview 026 环形链表
 * @author liuduan
 * @Date 2020-06-02 13:01:40
 * @LastEditTime 2020-06-03 14:29:57
 * https://leetcode-cn.com/problems/linked-list-cycle/
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
 * @return {boolean}
 * 快慢指针，2个人以不同的速度前进
 */
var hasCycle = function (head) {
    if (!head) return null;

    let slow = head;
    let fast = head.next;

    while (slow !== fast) {
        if (slow === null || fast === null) {
            return null;
        }

        slow = slow.next;
        fast = fast.next ? fast.next.next : null;
    }

    // console.log(slow);
    let cur = slow.next;
    let l = 1;
    while (cur !== slow) {
        l++;
        cur = cur.next;
    }

    console.log(l);
    slow = head;
    fast = head;
    while (l--) {
        fast = fast.next;
    }
    // console.log(fast);
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }


    console.log(fast);
    return fast;
};