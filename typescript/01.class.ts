/**
 * @fileoverview class
 * 
 * class 和 enum 同时属于 type space 和 value space
 */

class Cylinder {
    radius = 1;
    height = 1
}
const instance: Cylinder = new Cylinder();


const t1 = typeof Cylinder; // 不是表示类型，这时是个求值操作返回 function 
type t2 = InstanceType<typeof Cylinder>; // 这时才表示 Cylinder 类型
type t3 = typeof instance; // Cylinder
