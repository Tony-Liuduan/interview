/**
 * @fileoverview 避免使用装箱类型(String, Number, Boolean, Symbol, BigInt)
 * 
 * 优先使用类型声明而非类型断言
 */

const s0 = new String('ss');
const s1: string = s0; // String 无法赋值给 string
const s2: String = '123' // string 可以赋值给 String
