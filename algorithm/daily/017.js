/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-05-20 10:56:15
 * @LastEditTime 2020-05-20 11:19:53
 * 链表反转，输出表头
 */

 // 1 -> 2 - > 3
 // 2 -> 1
 // 3 -> 2 -> 1

function reverse(head) {
    let cur = head;
    let pre = null;
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
}