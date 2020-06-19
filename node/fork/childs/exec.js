/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-18 19:40:22
 * @LastEditTime 2020-06-19 16:07:44
 */
console.log(process.pid, process.argv);


// spawn-这里用stdout原因： 子进程的数据流与常规理解的数据流方向相反，
process.stdout.write('asd');

// ipc 通信
process.on('message', (msg) => {
    process.send('子进程' + msg)
});