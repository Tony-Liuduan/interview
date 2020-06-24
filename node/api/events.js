const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('x-event', () => {
    console.log('触发事件');
});

myEmitter.emit('x-event');

console.log('after emmit');
console.time()
setTimeout(() => {
    console.log('timeout');
}, 0);

require('fs').readFile('./fs.js', () => {
    console.timeEnd()
    setTimeout(() => {
        console.log('fs setTimeout');
    }, 0);
})

setImmediate(() => {
    console.log('immediate');
});