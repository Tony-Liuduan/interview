/**
 * @fileoverview 深度优先
 * @author liuduan
 * @Date 2020-06-14 23:51:46
 * @LastEditTime 2020-06-15 00:07:15
 */
// (a+b*c)-d/e
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

/* 
{
    -: {
        +: {
            a: null,
            *: {
                b: null,
                c: null,
            }
        },
        /: {
            d: null,
            e: null,
        }
    }
}

*/

function dfs_f(tree) {
    var result = [];
    function dfs(node) {
        if (node) {
            let {
                left,
                right,
            } = node;

            result.push(node);
            dfs(left);
            dfs(right)
        }
    }


    dfs(tree);

    return result;
}

// console.log(dfs_f(tree)); // ["-", "+", "a", "*", "b", "c", "/", "d", "e"]



// 中序遍历
function dfs_m(node) {
    var result = [];
    function dfs(node) {
        if (node) {
            let {
                left,
                right,
            } = node;
            dfs(left);
            result.push(node);
            dfs(right)
        }
    }


    dfs(tree);

    return result;
}

// console.log(dfs_m(tree)); // a + b * c - d / e



// 后续遍历

function dfs_a(tree) {
    let res = [];
    function dfs(node) {
        if (node) {
            const { left, right } = node;
            dfs(left);
            dfs(right);
            res.push(node);
        }
    }
    dfs(tree);
    return res;
}


console.log(dfs_a(tree)); // a + b * c - d / e
