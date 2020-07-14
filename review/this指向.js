/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-14 09:14:07
 * @LastEditTime 2020-07-14 09:16:57
 */
var obj = {
    a: 1,
    get() {
        return this.a;
    },
    obj1: {
        a: 2,
        get() {
            return this.a;
        },
    }
}

console.log(obj.get(), obj.obj1.get()) // 1, 2