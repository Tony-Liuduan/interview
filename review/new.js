/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 16:52:41
 * @LastEditTime 2020-06-27 11:47:20
 */
function New(Factory, ...args) {
    let obj = {};

    var res = Factory.apply(obj, args);

    if (typeof res === 'object' && res !== null || typeof res === 'function') {
        return res;
    }

    Object.setPrototypeOf(obj, Factory.prototype);

    return obj;
}
