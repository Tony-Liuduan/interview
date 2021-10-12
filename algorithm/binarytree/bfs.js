/**
 * @fileoverview 广度优先
 * @author liuduan
 * @Date 2020-06-15 00:12:00
 * @LastEditTime 2021-10-12 12:56:42
 */

// (a+b*c)-d/e
// var tree = {
//     value: "-",
//     left: {
//         value: '+',
//         left: {
//             value: 'a',
//         },
//         right: {
//             value: '*',
//             left: {
//                 value: 'b',
//             },
//             right: {
//                 value: 'c',
//             }
//         }
//     },
//     right: {
//         value: '/',
//         left: {
//             value: 'd',
//         },
//         right: {
//             value: 'e',
//         }
//     }
// }

// /*
// {
//     -: {
//         +: {
//             a: null,
//             *: {
//                 b: null,
//                 c: null,
//             }
//         },
//         /: {
//             d: null,
//             e: null,
//         }
//     }
// }

// */
// let bfs = function (tree) {
//     let result = [];
//     let stack = [tree];
//     while (stack.length) {
//         let node = stack.shift();
//         result.push(node.value);
//         if (node.left) stack.push(node.left);
//         if (node.right) stack.push(node.right);
//     }
//     console.log(result)
//     return result;
// }
// bfs(tree); // ["-", "+", "/", "a", "*", "d", "e", "b", "c"]



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

function bfs_ff(tree) {
    const result = [];
    const stack = [];
    let node = tree;
    while (node || stack.length) {
        if (node) {
            result.push(node.value);
            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop().right;
        }
    }
    console.log(result)
    return result;
}

function bfs_mm(tree) {
    const result = [];
    const stack = [];
    let node = tree;
    while (node || stack.length) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            const sn = stack.pop();
            result.push(sn.value);
            node = sn.right;
        }
    }
    console.log(result)
    return result;
}

function bfs_ee(tree) {
    const result = [];
    const stack = [];
    let node = tree;
    while (node || stack.length) {
        if (node) {
            result.unshift(node.value);
            stack.push(node);
            node = node.right;
        } else {
            const sn = stack.pop();
            node = sn.left;
        }
    }
    console.log(result)
    return result;
}
