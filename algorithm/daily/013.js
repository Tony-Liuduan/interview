/**
 * @fileoverview 每日一题 013
 * @author liuduan
 * @Date 2020-05-14 14:13:48
 * @LastEditTime 2020-05-14 14:18:41
 * https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/submissions/
 * 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度
 * 
 * 输入: "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */

/**
 * @param {string} s
 * @return {number}
 * 动态规划：
 * 1. 前面无重复的，f(i) = f(i-1) + 1
 * 2. 前面有重复的，计算下2个重复元素的距离d
 *      2.1 如果d > f(i-1) 则说明f(i) = f(i-1) + 1
 *      2.2 如果d <= f(i-1) 则说明f(i) = d
 * 举例：abbcdba 
 * a
 * ab
 * b
 * bc
 * bcd
 * cdb
 * cdba
 */
var lengthOfLongestSubstring = function (s) {
    let l = s.length;
    let max = 0;
    let cur = 0;
    let dic = {}

    for (let i = 0; i < l; i++) {
        if (!(s[i] in dic)) {
            cur++;
        } else {
            let dist = i - dic[s[i]];
            if (dist > cur) {
                cur++;
            } else {
                cur = dist;
            }
        }
        dic[s[i]] = i;

        max = Math.max(max, cur);
    }



    return max;

};