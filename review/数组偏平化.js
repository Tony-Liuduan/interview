/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-14 20:19:09
 * @LastEditTime 2020-07-15 16:14:35
 */
// 无递归数组扁平化，使用堆栈
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
// 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
var arr1 = [1, 2, 3, [4, 5, [6, 7], [8, 9, 10]], 11, 12];
function flatten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // 使用 pop 从 stack 中取出并移除值
        const next = stack.pop();
        if (Array.isArray(next)) {
            // 使用 push 送回内层数组中的元素，不会改动原始输入
            stack.push(...next);
        } else {
            res.unshift(next);
        }
    }
    console.log(res);
    return res;
}
flatten(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]