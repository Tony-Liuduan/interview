/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-10 17:23:33
 * @LastEditTime 2020-07-10 18:16:38
 */

// let d = new Date('1990-06-27')
// console.log(d);
// let t = +new Date(d);
// console.log(t);
// let dd = new Date(t);
// console.log(new Date('2200-22-02')); // Invalid Date

function getAge(strAge) {
    var birArr = strAge.split("-");
    var birYear = birArr[0];
    var birMonth = birArr[1];
    var birDay = birArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1; //记得加1
    var nowDay = d.getDate();
    var returnAge;

    if (birArr == null) {
        return false
    };
    var d = new Date(birYear, birMonth - 1, birDay);
    if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
        if (nowYear == birYear) {
            returnAge = 0; // 
        } else {
            var ageDiff = nowYear - birYear; // 
            if (ageDiff > 0) {
                if (nowMonth == birMonth) {
                    var dayDiff = nowDay - birDay; // 
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birMonth; // 
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;
    } else {
        return ("输入的日期格式错误！");
    }
}
//当前日期  2019-06-05
console.log(getAge("2000-03-22")); //["1980", "03", "22"] ——————19岁
console.log(getAge("2000-06-02")); //["1980", "06", "02"]——————19岁
console.log(getAge("2000-06-12")); //["1980", "06", "12"]——————18岁
console.log(getAge("2002-36-02")); //输入的日期格式错误！
console.log(getAge("2022-02-02")); //出生日期晚于今天，数据有误