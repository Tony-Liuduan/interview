/**
 * @fileoverview https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
 *  买股票最佳时机
 * 
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 */


/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let i = 1;
    let l = prices.length;
    let min = prices[0]; // 历史最低值
    let max = 0; // 最多赚多少钱

    for (; i < l; i++) {
        const val = prices[i];
        // 如果今天卖出，查询下最大值和历史最大值比较
        max = Math.max(max, val - min);
        min = Math.min(min, val);
    }
    console.log(max);
    return max;
};

maxProfit([7,1,5,3,6,4]);
maxProfit([]);