/**
 * 转换成参数形式
 * @params {Object} 类
 * @return {Object}
 */

// export const toOptions = params =>
//   Object.entries(params).reduce((accumulator, currentValue) => {
//     accumulator[currentValue[0]] = new currentValue[1]()
//     return accumulator;
//   }, {})

export const toOptions = params => Object.entries(params).reduce((result, [key, Cls]) => {
  result[key] = new Cls();
  return result;
}, {});