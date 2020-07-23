/**
 * @fileoverview 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * @author liuduan
 * @Date 2020-07-22 16:45:23
 * @LastEditTime 2020-07-22 20:23:17
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 */
/*
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
*/


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let arr = Array.from(s)
    let n = arr.length;
    let l = 0;
    let r = l + 1;

    if (n <= 0) {
        return 0;
    }

    if (r >= n) {
        return 1;
    }

    let tmp = [arr[l]];
    let maxLength = 0;

    while (r < n) {
        let val = arr[r];
        if (tmp.includes(val)) {
            console.log(tmp);
            maxLength = Math.max(maxLength, tmp.length);
            l++;
            r = l + 1;
            tmp = [arr[l]];
        } else {
            tmp.push(val);
            r++;
        }
    }

    maxLength = Math.max(maxLength, tmp.length);

    console.log(maxLength);

    return maxLength;
};


var lengthOfLongestSubstring = function (s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;

    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};



var lengthOfLongestSubstring = function (s) {
    let hash = new Set();

    let len = s.length;

    let r = 0;
    let l = 0;

    let maxLength = 0;

    for (; l < len; l++) {

        if (l > 0) {
            hash.delete(s.charAt(l - 1));
        }

        while (r < len) {
            let val = s.charAt(r);
            // console.log([...hash]);
            if (hash.has(val)) {
                break;
            } else {
                hash.add(val);
                r++;
            }
        }

        maxLength = Math.max(maxLength, hash.size);
    }
    console.log(maxLength);
    return maxLength;
};



var lengthOfLongestSubstring = function (s) {
    let arr = Array.from(s);
    let len = arr.length;
    let i = 0;
    let cur = 0;

    let hash = new Set();

    let maxLength = 0;

    while (i < len) {
        if (i > 0) {
            hash.delete(arr[i]);
        }

        while (cur < len && !hash.has(arr[cur])) {
            hash.add(arr[cur]);
            cur++;
        }

        maxLength = Math.max(maxLength, cur - i);

        i++;
    }

    console.log(maxLength);

    return maxLength;
}

lengthOfLongestSubstring("abcabc");