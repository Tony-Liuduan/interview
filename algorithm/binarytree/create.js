/*
 * @Author: liuduan
 * @Date: 2020-04-02 10:50:34
 * @LastEditors: liuduan
 * @LastEditTime: 2020-04-02 11:37:29
 * @Description: 创建二叉树，通过链表式物理存储
 */

class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data; 
        this.left = left;
        this.right = right;
    }
}

export class CreateBinaryTree {
    constructor() {
        this.root = new Node();
    }

    //放置左右节点的值
    insertNode(inputData) {
        if (this.root === null) {
            this.root = {}
            this.root.data = inputData
        } else {
            insertNode(this.root, inputData)
        }
    }
}

// 插入结点，这里构造的是一颗二叉搜索树，用重载写
function insertNode(node, inputData) {
    console.log(node, inputData);
    if (node.data > inputData) {
        // 放在左子树
        if (node.left === null) {
            node.left = new Node();
            node.left.data = inputData;
        } else {
            insertNode(node.left, inputData);
        }
    } else {
        // 放在右子树
        if (node.right === null) {
            node.right = new Node();
            node.right.data = inputData;
        } else {
            insertNode(node.right, inputData);
        }
    }
}
