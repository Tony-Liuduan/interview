/*
 * @Author: liuduan
 * @Date: 2020-05-06 21:34:36
 * @LastEditors: liuduan
 * @LastEditTime: 2020-05-06 22:03:53
 * @Description: 
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 * 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
 * https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/
 */


/**
* @param {string} s
* @return {string[]}
*/
var permutation = function (s) {
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
            console.log("-----", step, i)
            if (vis[i] === true) continue;
            vis[i] = true;
            dfs(step + 1, curP + s[i]);

            vis[i] = false;
            console.log(i, curP, vis)
            console.log("-----", step, i)
        }
    }
    dfs(0, '');
    return res;
};

console.log(p('abc'))




function p(s) {

    var vis = [];
    var res = [];

    const dfs = function (step, cur) {

        let l = s.length;

        if (step === l && !res.includes(cur)) {
            res.push(cur);
            return;
        }

        for (let i = 0; i < l; i++) {
            if (vis[i]) {
                continue;
            }

            vis[i] = true;

            dfs(step + 1, cur + s[i]);

            vis[i] = false;

        }
    }

    dfs(0, '');

    return res;
}