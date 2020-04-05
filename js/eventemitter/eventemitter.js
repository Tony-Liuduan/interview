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
