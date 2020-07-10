/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-09 11:29:15
 * @LastEditTime 2020-07-10 15:22:54
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

dfs(tree);