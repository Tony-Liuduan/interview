/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-09 11:29:15
 * @LastEditTime 2020-07-17 15:40:38
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

getPath(tree1, 7)