/**
 * @fileoverview 链表反转
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    console.log('=====', head);
    let preNode = null;
    let curNode = head;
    while (curNode) {
        const next = curNode.next;
        curNode.next = preNode;
        preNode = curNode;
        curNode = next;
    }

    console.log(preNode);
    console.log(preNode?.next);
    console.log(preNode?.next?.next);
    console.log(preNode?.next?.next?.next);
    console.log(preNode?.next?.next?.next?.next);

    return preNode;
};

const test = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: null
            }
        }
    }
}

reverseList(test);
reverseList({});
reverseList(null);
