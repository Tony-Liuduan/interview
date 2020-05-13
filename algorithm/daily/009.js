/**
 * @fileoverview 每日一题009
 * @author liuduan
 * @Date 2020-05-11 13:19:14
 * @LastEditTime 2020-05-13 10:26:59
 * 
 * https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/
 * 
 * 把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
 * 你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。
 * 
 * 输入: 1
 * 输出: [0.16667,0.16667,0.16667,0.16667,0.16667,0.16667]
 * 
 * 输入: 2
 * 输出: [0.02778,0.05556,0.08333,0.11111,0.13889,0.16667,0.13889,0.11111,0.08333,0.05556,0.02778]
 */

/**
* @param {number} n
* @return {number[]}
*/

// 1个骰子 
// 1 2 3 4 5 6

// 2个骰子 
// 2 3 4 5 6 7 
// 3 4 5 6 7 8
// 4 5 6 7 8 9
// 5 6 7 8 9 10
// 6 7 8 9 10 11
// 7 8 9 10 11 12

// 2 - 1
// 3 - 2 
// 4 - 3
// 5 - 4
// 6 - 5
// 7 - 6
// 8 - 5
// 9 - 4
// 10 - 3 
// 11 - 2
// 12 -1


1 - 1



// 1 2 3 4 5 6

var twoSum = function (n) {
    let min = n * 1;
    let max = n * 6;

    let len = max - min + 1;

    // 因为每个骰子掷出每个数字的概率都是 1/6，所以对于 n 枚骰子，每次掷出的数字组合的概率都为 (1/6)^n
    // let per = (1/6)^n;

    // 也就是说如果和为 s 的组合有 k 种，那么和为 s 的概率为 
    // k * (1 / 6) ^ n
    // k = dp[n][s]
    // 也就是如果投第 n-1 枚骰子总点数为 s - i (1 ≤ i ≤ 6)

    // getCount(2, 4) = getCount(1, 1) + getCount(1, 2) + getCount(1, 3)
    // getCount(2, 6) = getCount(1, 1) + getCount(1, 2) + getCount(1, 3) + getCount(1, 4) + getCount(1, 5)

    // getCount(3, 4) = getCount(2, 1) + getCount(2, 2) + getCount(2, 3)

    let map = new Map();
    let totoalTimes = Math.pow(6, n); // 出现的总次数
    const res = [];

    dfs(0, 1);

    for (const times of map.values()) {
        res.push(times / totoalTimes);
    }

    console.log(res);

    return res;

    function dfs(total, step) {

        if (step > n) {
            map.set(total, map.has(total) ? map.get(total) + 1 : 1);
            return;
        }

        for (let i = 1; i <= 6; i++) {
            console.log(total, step);
            dfs(total + i, step + 1);
        }
    }


    // let list = [];

    // let count = 0;
    // for (let j = min; j <= max; j++) {  
    //     count = 1;
    //     list.push(getCount(n, j) / len);

    // }

    // function getCount(n, s) {
    //     if (n === 1) {
    //         if (s >= 1 && s <= 6) {
    //             return 1;
    //         }
    //         return 0;
    //     }

    //     for (let i = 1; i < s; i++) {
    //         count += getCount(n - 1, i);
    //     }

    //     console.log(n, s, count, '------');
    // }

    // console.log(list);

    // return list;

};

twoSum(2);


let a = 3;
let b = 2

console.log(a ^ b)
