/**
 * @fileoverview 
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {

    if (!s) {
        return 0;
    }

    if (s.length === 1) {
        return 1;
    }

    let i = 0;
    let j = 1;

    let temp = [s[0]];

    let maxLength = 1;

    while (j < s.length) {
        const v = s[j];
        if (temp.includes(v)) {
            i++;
            temp.shift();
        } else {
            temp.push(v);
            j++;
        }
        if (i === j) {
            j++;
        }
        maxLength = maxLength > temp.length ? maxLength : temp.length;
    }

    console.log(maxLength);
    return maxLength;

};

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

lengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('bbbbb');
lengthOfLongestSubstring('pwwkew');
lengthOfLongestSubstring('');