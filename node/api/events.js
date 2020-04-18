const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('x-event', () => {
    console.log('触发事件');
});

myEmitter.emit('x-event');
