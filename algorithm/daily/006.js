/*
 * @Author: liuduan
 * @Date: 2020-05-06 21:34:36
 * @LastEditors: liuduan
 * @LastEditTime: 2020-05-07 11:03:28
 * @Description: 回溯算法：核心：在for循环中调用递归，给递归一个返回条件，在递归结束后修改回递归前的状态，即回溯
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 * 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
 * https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/
 */


/**
* @param {string} s
* @return {string[]}
*/
var permutations = function (s) {
    let vis = [];
    let res = [];
    let dfs = (step, curP) => {
        if (step === s.length) {
            if (res.indexOf(curP) === -1) {
                res.push(curP);
            }
            return;
        }
        for (let i = 0; i < s.length; i++) {
            console.log("-----", step, i, s[i])
            if (vis[i] === true) continue;
            vis[i] = true;
            dfs(step + 1, curP + s[i]);

            vis[i] = false;
            console.log(i, curP, vis)
            console.log("++++++", step, i, s[i])
        }
    }
    dfs(0, '');
    return res;
};


/**
* @param {string} s
* @return {string[]}
*/
function permutation(s) {
    let res = [];
    let waitqueue = s.split('');
    let path = '';

    let dfs = function (waitqueue, res, path, char) {
        path += char;
        if (waitqueue.length === 0) {
            res.push(path);
            return;
        }

        for (let i = 0; i < waitqueue.length; i++) {
            let x = waitqueue.shift();
            console.log('start::::::::::::::::::::', i, x, '----', waitqueue, path);
            dfs(waitqueue, res, path, x);
            waitqueue.push(x);
        }
    }

    dfs(waitqueue, res, path, '');

    return [...new Set(res)].sort();
}


console.log(permutation('abc'))
