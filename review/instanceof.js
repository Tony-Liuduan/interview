/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 17:31:32
 * @LastEditTime 2020-07-04 15:20:54
 */
function instanceofs (obj, cls) {

    if (!cls.prototype) {
        return false;
    }

    if (obj == null) {
        throw new TypeError();
    }

    let o = Object(obj);
    let p;

    while (p = Object.getPrototypeOf(o)) {
        if (p === cls.prototype) {
            return true;
        }

        o = p;
    }

    return false;
}