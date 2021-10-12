/**
 * @fileoverview 深度优先
 * @author liuduan
 * @Date 2020-06-14 23:51:46
 * @LastEditTime 2021-10-12 10:23:54
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


/* const tree = {
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


const def_f = (node) => {
    const list = [];
    function deep(node) {
        if (node) {
            const { left, right } = node;
            list.push(node.value);
            deep(left);
            deep(right);
        }
    }
    deep(node);
    console.log(list);
}

const def_m = (node) => {
    const list = [];
    function deep(node) {
        if (node) {
            const { left, right } = node;
            deep(left);
            list.push(node.value);
            deep(right);
        }
    }
    deep(node);
    console.log(list);
}

const def_e = (node) => {
    const list = [];
    function deep(node) {
        if (node) {
            const { left, right } = node;
            deep(left);
            deep(right);
            list.push(node.value);
        }
    }
    deep(node);
    console.log(list);
}

def_f(tree);
def_m(tree);
def_e(tree); */