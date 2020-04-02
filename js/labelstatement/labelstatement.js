/* var temp = 0;
start:
for (var i = 0; i < 5; i++) {
    for (var m = 0; m < 5; m++) {
        if (m == 1) {
            break start;
        }
        temp++;
    }
}
alert(temp);
 */

// 假设str是你通过ajax接收到的JSON串
var str = '{"name": "liu", "age": 20}';
var obj = eval('(' + str + ')');
console.log(obj);
// 如果不加()
// var obj1 = eval(str); // Uncaught SyntaxError: Unexpected token ':'
/* 
不加括号等同于执行
{
    "name": "liu", "age": 20
} 
这里就变成了,表达式
逗号表达式要求每一项都必须是表达式，输出最后一项的结果，而这里不满足要求，所以会报错

小括号可以把里面的内容当做表达式来解析，那么里面的内容就是一个对象了
*/



// C语言goto语法，进行程序跳转
/* void main(){
    int a = 2, b = 3;

    if (a > b) {
        goto aa;
    }

    printf("hello");

    aa: printf("s");

    return 0;
} */
// js写法
aa: {
    for (var i = 0; i < 10; i++) {
        console.log(i, 'out for');
        for (var j = 0; j < 5; j++) {
            console.log(j, 'in for');
            // break aa 跳出了整个代码块
            if (j === 2) {
                break aa;
            }
        }
    }
}

console.log('done');