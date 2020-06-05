/**
 * @fileoverview 029 同构字符串
 * @author liuduan
 * @Date 2020-06-05 13:20:11
 * @LastEditTime 2020-06-05 13:21:14
 * https://leetcode-cn.com/problems/isomorphic-strings/
 * 输入: s = "egg", t = "add"
 * 输出: true
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    let map = {};
    let flags = [];
    let l = s.length;
    for (let i = 0; i < l; i++) {
        let v1 = s[i];
        let v2 = t[i];

        if (map[v1] && map[v1] !== v2) {
            return false;
        }

        if (!map[v1]) {
            if (flags.includes(v2)) {
                return false;
            } else {
                map[v1] = v2;
                flags.push(v2);
            }
        }
    }
    return true;
};