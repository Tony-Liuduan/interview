/**
 * @fileoverview 类
 * @author liuduan
 * @Date 2020-06-11 11:27:48
 * @LastEditTime 2020-06-11 14:40:18
 * 本应该import进来其他的依赖类，这里通过依赖注入实现类的控制反转
 */
import { Init } from './Interface.js'; // 抽象类


class Main extends Init {
  constructor(di) {
    super();
    // 依赖注入抽象类
    Object.assign(this, di);
    this.di = di;
  }
  
  init() {
    (Object.values(this.di)).map(item => item.init());
    console.log('Main::init');
    this.render();
  }

  render() {
    let content = this.Ajax.request();
    console.log('content from', content);
  }
}

export default Main;