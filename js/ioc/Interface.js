/**
 * @fileoverview 抽象类，实现依赖反转 DIP
 * @author liuduan
 * @Date 2020-06-11 11:27:48
 * @LastEditTime 2020-06-11 14:43:20
 */
export class Service {
  request() {
    throw `${this.constructor.name} 没有实现 request 方法！`
  }
}

export class Init {
  init() {
    throw `${this.constructor.name} 没有实现 init 方法！`
  }
}

/* 混合抽象类 */
export function mix(...mixins) {
  class Mix {
    constructor() {
      mixins.forEach(cls => {
        copyProperties(this, new cls());  // 拷贝实例属性
      });
    }
  }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mix;
}


function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    // console.log(key, '-----Reflect key', source);
    if (
      key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}