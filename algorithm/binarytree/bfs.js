/**
 * @fileoverview 广度优先
 * @author liuduan
 * @Date 2020-06-15 00:12:00
 * @LastEditTime 2020-06-15 00:21:07
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
let bfs = function (tree) {
    let result = [];
    let stack = [tree];
    while (stack.length) {
        let node = stack.shift();
        result.push(node.value);
        if (node.left) stack.push(node.left); 
        if (node.right) stack.push(node.right);
    }
    console.log(result)
    return result;
}
bfs(tree); // ["-", "+", "/", "a", "*", "d", "e", "b", "c"]