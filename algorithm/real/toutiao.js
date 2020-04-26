/* 
1. 硬币找零问题：有面额为d1...dn的硬币，和要找零的钱数，找出所需最小硬币个数的方案，
例如，美国有以下面额(硬币）：
    d1 = 1, d2 = 5, d3 = 10, d4 = 25，
    如果要找36美分的零钱，所需最少硬币是[1, 10, 25]，
即满足如下输出：
const minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36)) // [1, 10, 25] 
const minCoinChange2 = new MinCoinChange([1, 3, 4]);
console.log(minCoinChange2.makeChange(6)) // [3, 3] 
*/