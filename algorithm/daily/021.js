/**
 * @fileoverview 021
 * @author liuduan
 * @Date 2020-05-26 20:33:15
 * @LastEditTime 2020-05-26 20:33:30
 * 两个链表的第一个公共节点
 * https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/
 * 输入两个链表，找出它们的第一个公共节点。
 */


/**
* Definition for singly-linked list.
* function ListNode(val) {
*     this.val = val;
*     this.next = null;
* }
*/

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    // let cur = headA;
    // let cache = new WeakMap();
    // while(cur) {
    //     cache.set(cur, true);
    //     cur = cur.next;
    // }

    // let curb = headB;
    // while(curb) {
    //     if (cache.has(curb)) {
    //         return curb;
    //     }
    //     curb = curb.next;
    // }

    // return null;
    // let node1 = headA;
    // let node2 = headB;
    // let flag1 = false;
    // let flag2 = false;

    // while (node1 !== node2 && node1 && node2) {
    //     node1 = node1.next;
    //     node2 = node2.next;

    //     if (node1 === null && !flag1) {
    //         flag1 = true;
    //         node1 = headB;
    //     }

    //     if (node2 === null && !flag2) {
    //         flag2 = true;
    //         node2 = headA;
    //     }
    // }

    // return node1 && node2;



    let l1 = 0;
    let na = headA;
    while (na) {
        l1++;
        na = na.next;
    }
    if (!l1) {
        return null;
    }
    let l2 = 0;
    let nb = headB;
    while (nb) {
        l2++;
        nb = nb.next;
    }
    if (!l2) {
        return null;
    }

    let slow = null;
    let fast = null;

    if (l1 > l2) {
        slow = headA;
        fast = headB;
        diff = l1 - l2;
    } else {
        slow = headB;
        fast = headA;
        diff = l2 - l1;
    }

    while (diff--) {
        slow = slow.next;
    }

    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
};