/*
 * @Author: liuduan
 * @Date: 2020-04-02 10:50:48
 * @LastEditors: liuduan
 * @LastEditTime: 2020-04-02 11:43:16
 * @Description: 遍历二叉树
 */
// import { CreateBinaryTree } from './create.js';

// 构建二叉查找树
// const tree = new CreateBinaryTree();
// tree.insertNode(8);
// tree.insertNode(6);
// tree.insertNode(12);
// tree.insertNode(3);
// tree.insertNode(7);
// tree.insertNode(10);



/**
 * @description: 前序遍历
 * @param {type}
 * @return:
 */
const result = [];
function inorder(tree) {

}


/**
* @description: 中序遍历
* @param {type}
* @return:
*/


/**
* @description: 后序遍历
* @param {type}
* @return:
*/

const tree = {
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



// dfs 遍历
function dfs_f(tree) {
    const res = [];
    function dfs(node) {
        if (node) {
            const { left, right, value } = node;
            res.push(value);
            dfs(left);
            dfs(right);
        }
    }
    dfs(tree);
    console.log(res);
    return res;
}

function dfs_m(tree) {
    const res = [];
    function dfs(node) {
        if (node) {
            const { left, right, value } = node;
            dfs(left);
            res.push(value);
            dfs(right);
        }
    }
    dfs(tree);
    console.log(res);
    return res;
}

function dfs_e(tree) {
    const res = [];
    function dfs(node) {
        if (node) {
            const { left, right, value } = node;
            dfs(left);
            dfs(right);
            res.push(value);
        }
    }

    dfs(tree);
    console.log(res);
    return res;
}

// dfs deep
function dfs_deep(tree) {
    if (!tree) {
        return 0;
    }
    function dfs(node) {
        if (!node) {
            return 0;
        }
        return 1 + Math.max(dfs(node.left), dfs(node.right))
    }
    const deep = dfs(tree);
    console.log(deep);
    return deep;
}

// dfs paths
function dfs_paths(tree) {
    const paths = [];
    function dfs(node, path) {
        if (node) {
            const { left, right, value } = node;
            path.push(value);
            if (left) {
                dfs(left, [...path]);
            }
            if (right) {
                dfs(right, [...path]);
            }
            if (!left && !right) {
                paths.push(path);
            }
            path = null;
        }
    }
    dfs(tree, []);
    console.log(paths);
    return paths;
}

// dfs find by node id
function dfs_findById(tree, id) {
    let targetNode;
    let targetPath;
    function dfs(node, path) {
        if (node) {
            const { left, right, value } = node;
            path.push(value);
            if (value === id) {
                targetNode = node;
                targetPath = path;
                return;
            }
            if (left) {
                dfs(left, [...path]);
            }
            if (right) {
                dfs(right, [...path]);
            }
            path = null;
        }
    }
    dfs(tree, []);
    console.log(targetNode, targetPath);
    return targetPath;
}

// dfs_f(tree);
// dfs_m(tree);
// dfs_e(tree);
// dfs_deep(tree);
// dfs_paths(tree);
// dfs_findById(tree, 2);


// bfs 遍历
function bfs(tree) {
    const res = [];
    let stack = tree ? [tree] : [];
    while (stack.length) {
        const node = stack.shift();
        res.push(node.value);
        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }
    console.log(res);
    return res;
}

function bfs_f(tree) {
    const res = [];
    const stack = [];
    let node = tree;
    while (node || stack.length) {
        if (node) {
            res.push(node.value);
            stack.push(node);
            node = node.left;
        } else {
            const sn = stack.pop();
            node = sn.right;
        }
    }
    console.log(res);
    return res;
}

function bfs_m(tree) {
    const res = [];
    const stack = [];
    let node = tree;
    while (node || stack.length) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            const sn = stack.pop();
            res.push(sn.value);
            node = sn.right;
        }
    }
    console.log(res);
    return res;
}

function bfs_e(tree) {
    const res = [];
    const stack = [];
    let node = tree;
    while (node || stack.length) {
        if (node) {
            res.unshift(node.value);
            stack.push(node);
            node = node.right;
        } else {
            const sn = stack.pop();
            node = sn.left;
        }
    }
    console.log(res);
    return res;
}

function bfs_deep(tree) {
    let stack = tree ? [tree] : [];
    let deep = 0;
    while (stack.length) {
        deep++;
        const nextLevelNodes = [];
        for (const node of stack) {
            if (node.left) {
                nextLevelNodes.push(node.left);
            }
            if (node.right) {
                nextLevelNodes.push(node.right);
            }
        }
        stack = nextLevelNodes;
    }
    console.log(deep);
    return deep;
}

function bfs_paths(tree) {
    const paths = [];
    let pathQueue = tree ? [[tree.value]] : [];
    let stack = tree ? [tree] : [];
    while (stack.length) {
        const node = stack.shift();
        const path = pathQueue.shift();
        if (node.left) {
            stack.push(node.left);
            pathQueue.push([...path, node.left.value]);
        }
        if (node.right) {
            stack.push(node.right);
            pathQueue.push([...path, node.right.value]);
        }
        if (!node.left && !node.right) {
            paths.push(path);
        }
    }
    console.log(paths);
    return paths;
}

bfs(tree);
bfs_f(tree);
bfs_m(tree);
bfs_e(tree);
bfs_deep(tree);
bfs_paths(tree);