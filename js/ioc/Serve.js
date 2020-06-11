/**
 * @fileoverview 底层调用类，通过抽象类，实现依赖反转DIP
 * @author liuduan
 * @Date 2020-06-11 14:24:06
 * @LastEditTime 2020-06-11 14:27:15
 */

import {
    Service,
    Init,
    mix,
} from './Interface.js';

export class Ajax extends mix(Init, Service) {
    constructor() {
        super();
    }
    init() {
        console.log('Ajax::init')
    }
    request() {
        return this.constructor.name;
    }
}


export class Router extends Init {
    constructor() {
        super();
    }
    init() {
        console.log('Router::init')
    }
}
