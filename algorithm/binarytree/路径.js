/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-09 11:29:15
 * @LastEditTime 2021-10-12 14:33:32
 */
var tree = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
        },
        right: {
            value: 5,
        },
    },
    right: {
        value: 3,
    }
}


function dfs(tree) {
    let paths = [];
    function _dfs(t, path) {
        if (t) {
            path += t.value;

            t.left && _dfs(t.left, path);
            t.right && _dfs(t.right, path);

            if (!t.left && !t.right) {
                paths.push(path);
            }
        }
    }

    _dfs(tree, '');

    console.log(paths);

    let sum = paths.reduce((a, b) => a + +b, 0)
    console.log(sum);

    return sum;
}

// dfs(tree);



var tree1 = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                {
                    value: 3,
                },
                {
                    value: 4,
                },
            ]
        },
        {
            value: 5,
            children: [
                {
                    value: 6,
                },
                {
                    value: 7,
                    children: [
                        {
                            value: 8,
                        },
                    ]
                },
            ]
        }
    ]
}

function getPath(tree, id) {
    let res;

    function dfs(tree, path) {
        if (tree) {
            path += tree.value;
            if (tree.value === id) {
                res = path;
                return;
            }
            if (tree.children) {
                for (let childNode of tree.children) {
                    dfs(childNode, path);
                }
            }
        }
    }

    dfs(tree, '');
    console.log(res);
    return res;
}

// getPath(tree1, 7)



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

function getPathByBfs(tree, id) {
    let stack = tree ? [tree] : [];
    let pathQueue = tree ? [[tree.value]] : [];
    let paths = [];
    let targetPath;

    while (stack.length) {
        const node = stack.shift();
        const path = pathQueue.shift();
        if (node.value === id) {
            targetPath = path;   
            break;
        }
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
    console.log(targetPath, '_____________', paths);
    return paths;
}


function getPathByDfs(tree, id) {

    let paths = [];
    let targetPath = [];

    function dfs(node, path) {
        path.push(node.value);
        if (node.value === id) {
            targetPath = path;
            return;
        }
        if (node.left) {
            dfs(node.left, [...path]);
        }
        if (node.right) {
            dfs(node.right, [...path]);
        }
        if (!node.left && !node.right) {
            paths.push(path);
        }
        path = null;
    }

    dfs(tree, []);

    console.log(paths, targetPath);

    return paths;
}

getPathByBfs(treeCase, 7);
getPathByDfs(treeCase, 7);