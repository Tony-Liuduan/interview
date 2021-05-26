# 发布订阅 vs 观察者设计模式

## 引用

* <https://segmentfault.com/a/1190000017833159>
* <https://www.gushiciku.cn/pl/glac>

## 观察者设计模式

### 成员 (2)

* Subject  (被观察的对象) 目标又称为主题
* Observer (观察者)

### 特点

* 被观察者-接受观察者回调fn
* 被观察者-触发观察者回调fn
* 观察者和被观察者不完全解耦
* 被观察者和观察者的关系是 1:n 关系

```txt
╭─────────────╮  Fire Event  ╭──────────────╮
│             │─────────────>│              │
│   Subject   │              │   Observer   │
│             │<─────────────│              │
╰─────────────╯  Subscribe   ╰──────────────╯
```

### 使用场景

* 事件的监听触发
* rxjs Observable
* 单个应用

```js
function refresh() {
    $('div').empty().text('you are stupid.')
    $('div').trigger('refresh')
}
  // ...
$('div').on('refresh', () => {
    $('span').empty().text('go to find it.')
})
```

## 发布订阅

### 成员 (3)

* Publisher (被观察者) Publisher 变化通知 Subscriber
* Proxy (Event Channel)
* Subscriber (观察者)

### 特点

* 被观察者-接受观察者回调fn
* 被观察者-触发观察者回调fn
* 观察者和被观察者完全解耦
* 被观察者和观察者的关系是 n:1:n 关系

```txt
 ╭─────────────╮                 ╭───────────────╮   Fire Event   ╭──────────────╮
 │             │  Publish Event  │               │───────────────>│              │
 │  Publisher  │────────────────>│ Event Channel │                │  Subscriber  │
 │             │                 │               │<───────────────│              │
 ╰─────────────╯                 ╰───────────────╯    Subscribe   ╰──────────────╯

```

### 使用场景

* event bus
* rxjs ReplaySubject 多播 ??
* 多应用间通信, 订阅和发布者之间互相不认识 (qiankun)

```js
class EventEmitter {
    constructor() {
        this.events = this.events || new Map();
    }

    addListener(type, fn) {
        if (this.events.get(type)) return;

        this.events.set(type, fn);

        return () => {
            this.events.delete(type);
        }
    }

    emit(type, ...args) {
        let fn = this.events.get(type);
        if (fn) {
            fn.apply(this, args);
        }
    }
}

let emitter = new EventEmitter()
// 监听事件
let cancel = emitter.addListener('ages', age => {
    console.log(age)
})
// 触发事件
emitter.emit('ages', 18)  // 18
// cancel();
emitter.emit('ages', 20)  // 20

```
