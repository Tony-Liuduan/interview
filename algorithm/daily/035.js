/**
 * @fileoverview 035 链表22反转
 * @author liuduan
 * @Date 2020-06-15 11:34:22
 * @LastEditTime 2020-06-15 11:34:37
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/submissions/
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
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (!head || !head.next) {
        return head;
    }

    let next = head.next;
    head.next = swapPairs(next.next);
    next.next = head;

    return next;
};