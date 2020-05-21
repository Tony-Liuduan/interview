/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-05-21 15:02:57
 * @LastEditTime 2020-05-21 15:17:29
 * 
 * https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
 * 链表中倒数第k个节点
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。
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
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
    let fast = head;
    let slow = head;
    let i = 0;
    // 双指针法则
    while (fast) {
        if (i >= k) {
            slow = slow.next;
        }
        fast = fast.next;
        i++;
    }
    return slow;
};