/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-05 13:33:29
 * @LastEditTime 2020-07-05 13:35:18
 */
// 模拟react event
console.group('react event');
console.log('react event start');

var reELe = document.createElement('react');
var event = document.createEvent('Event');
event.initEvent('react-click', false, false);
reELe.addEventListener('react-click', function (e) {
    console.log('react event run addEventListener callback')
}, false);

reELe.dispatchEvent(event);

console.log('react event end');
console.groupEnd();



// CustomEvent
// add an appropriate event listener
obj.addEventListener("cat", function (e) { process(e.detail) });
// create and dispatch the event
var event = new CustomEvent("cat", {
    detail: {
        hazcheeseburger: true
    }
});
obj.dispatchEvent(event);