/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-04-14 12:41:46
 * @LastEditTime 2020-06-12 17:30:47
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('x-event', () => {
    console.log('触发事件');
});

myEmitter.emit('x-event');


setTimeout(() => {
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});