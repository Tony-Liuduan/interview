/**
 * @fileoverview  每日一题014
 * @author liuduan
 * @Date 2020-05-16 09:06:01
 * @LastEditTime 2020-05-16 17:16:41
 * 
 * https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 * 
 * 题目：机器人的运动范围
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
 * 一个机器人从坐标 [0, 0] 的格子开始移动，
 * 它每次可以向左、右、上、下移动一格（不能移动到方格外），
 * 也不能进入行坐标和列坐标的数位之和大于k的格子。
 * 例如，当k为18时，机器人能够进入方格 [35, 37] ，
 * 因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。
 * 请问该机器人能够到达多少个格子？
 * 1 <= n,m <= 100
 * 0 <= k <= 20
 */


/**
* @param {number} m
* @param {number} n
* @param {number} k
* @return {number}
* 输入：m = 2, n = 3, k = 1
* 输出：3
*/

function bitSum(n) {
    let sum = 0;
    while (n) {
        sum += n % 10;
        n = Number.parseInt(n / 10);
    }
    return sum;
}

// 广度优先bfs
var movingCount = function (m, n, k) {
    let res = 0;
    // 设置遍历方向，分别往右、往下
    const directions = [
        [1, 0],
        [0, 1],
    ];
    const queue = [
        [0, 0],
    ];
    // 标记坐标点是否被访问过
    const visited = {
        '0-0': true
    };
    while (queue.length) {
        const [x, y] = queue.shift();

        if (bitSum(x) + bitSum(y) > k) {
            // 每次只能走一个格子，所以不能从当前坐标继续出发
            continue;
        }

        res++;

        for (const direction of directions) {
            const newx = direction[0] + x;
            const newy = direction[1] + y;

            if (
                !visited[`${newx}-${newy}`] &&
                newx >= 0 &&
                newy >= 0 &&
                newx < m &&
                newy < n
            ) {
                console.log(`${newx}-${newy}`)
                queue.push([newx, newy]);
                visited[`${newx}-${newy}`] = true;
            }
        }

        console.log('-------')
    }

    console.log(res);

    return res;
};


// 深度优先遍历dfs
var movingCount = function (m, n, k) {
    let res = 0;
    // 设置遍历方向，分别往右、往下
    const directions = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];
    // 标记坐标点是否被访问过
    const visited = {
        '0-0': true
    };

    const dfs = (x, y) => {
        visited[`${x}-${y}`] = true;
        if (bitSum(x) + bitSum(y) > k) {
            return;
        }
        res++;
        for (const direction of directions) {
            const newx = direction[0] + x;
            const newy = direction[1] + y;
            if (
                !visited[`${newx}-${newy}`] &&
                newx >= 0 &&
                newy >= 0 &&
                newx < m &&
                newy < n
            ) {
                dfs(newx, newy);
            }
        }
    }

    dfs(0, 0);


    console.log(res);

    return res;
};


movingCount(23, 33, 3);