/**
 * @fileoverview 二叉树深度
 * @author liuduan
 * @Date 2020-06-15 00:22:56
 * @LastEditTime 2021-10-12 13:12:58
 * https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/submissions/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}
/* bfs */
var maxDepth = function (root) {
    if (!root) return 0;
    // 创建一个队列
    let queue = [root];
    let deep = 0;
    let res = [];

    while (queue.length) {
        let tmp = [];
        for (const node of queue) {
            res.push(node.value);
            let { left, right } = node;
            left && tmp.push(left);
            right && tmp.push(right);
        }
        queue = tmp;
        deep++;
    }

    console.log(res);

    return deep;
};
/* dfs */
var maxDepth = function (root) {
    if (!root) return 0;
    let leftDeep = 0;
    let rightDeep = 0;
    function dfs(node) {
        if (node) {
            return 1 + Math.max(dfs(node.left), dfs(node.right));
        } else {
            return 0;
        }
    }

    leftDeep = dfs(root.left);
    rightDeep = dfs(root.right);

    console.log(leftDeep, rightDeep);

    return 1 + Math.max(leftDeep, rightDeep);
};

var maxDepth = function (root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

const deep = maxDepth(tree);
console.log(deep);


const treeCase = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
        },
        right: {
            value: 5,
            left: {
                value: 7,
            },
            right: {
                value: 8,
            }
        }
    },
    right: {
        value: 3,
        right: {
            value: 6,
        }
    }
}

function getTreeLevelByBfs (tree) {
    let levelNodes = tree ? [tree] : [];
    let level = 0;
    while(levelNodes.length) {
        let nextLevelNodes = [];

        for (const levelNode of levelNodes) {
            if (levelNode.left) {
                nextLevelNodes.push(levelNode.left)
            }
            if (levelNode.right) {
                nextLevelNodes.push(levelNode.right)
            }
        }

        levelNodes = nextLevelNodes;

        level++;
    }
    console.log(level);
    return level;
}

function getTreeLevelByDfs (tree) {
    let leftLevel = 0;
    let rightLevel = 0;
    function dfs(node) {
        if (node) {
            return 1 + Math.max(dfs(node.left), dfs(node.right));
        } else {
            return 0;
        }
    }
    leftLevel = dfs(tree.left);
    rightLevel = dfs(tree.right);
    console.log(1 + Math.max(leftLevel, rightLevel));
    return 1 + Math.max(leftLevel, rightLevel);
} 

getTreeLevelByBfs(treeCase);
getTreeLevelByDfs(treeCase);