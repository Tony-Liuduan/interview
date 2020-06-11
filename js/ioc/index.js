/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-11 11:27:48
 * @LastEditTime 2020-06-11 14:36:55
 */
import {
    Ajax,
    Router,
} from './Serve.js';
import Main from './Main.js';
import { toOptions } from './utils.js'

/**
 * toOptions
 * 转换成参数形式
 * @params {Object} 类
 * @return {Object}
 * {
 *    Service: Service实例,
 *    Router: Router实例
 * }
 */

const options = toOptions({
    Ajax,
    Router,
});
const instance = new Main(options);
instance.init();