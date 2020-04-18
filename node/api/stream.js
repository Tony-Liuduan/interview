/**
 * @description stream
 * 
 * @module 特点：
 * 逐段读取，适合大数据文件
 * 节省内存，节省时间
 * 相对于传统的一次性读取文件内容更安全性能更优
 * 
 * 使用二进制读取优点
 * 1. 谁都认识
 * 2. 效率高
 * 
 * --------------------------------------
 * 
 * @module 流的类型（4种）
 * 1. 可读流 createReadStream
 * 2. 可写流 createWriteStream
 * 3. 双工流 Duplex net.socket 可读可写
 * 4. 转换流 transform 文件内容转换
 * 
 * stream 对象都是EventEmitter对象的实例
 * 
 * --------------------------------------
 * @module 可读流
 * highWaterMark 默认16k
 * 
 * 注意：当fs.createReadStream方法调用后，数据还是静态未流动状态，当调用ondata后自动变为流动状态
 * 流动方式：
 *     - 1. 自动流动：on 'data' 监听on data 事件 | rs.resume() | rs.pipe()
 *     - 2. 手动流动：on 'readable' | rs.pause() 需要显示调用rs.read()
 * 
 * 注册事件：
 *     - data
 *     - end
 *     - error
 *     - close
 *     - readable
 * 注册方法：
 *     - read
 *     - pipe (保证读写速度一直)（压缩文件）
 * 
 * 
 * --------------------------------------
 * @module 可写流
 * 
 * 注册事件：
 *     - open
 *     - finish
 *     - error
 *     - close
 *     - readable
 * 注册方法：
 *     - write
 *     - end
 * 
 * 
 * --------------------------------------
 * @module 转换流
 * require('stream').Transform({transform() {}})
 * 
 * 要求用户必须自己实现一个transform方法
 * 
 * 注册方法：
 *     - wirte
 *     - read
 * 
 * --------------------------------------
 * @module readline 逐行读取文件
 * const readline = require('readline');
 * const readL = readline.createInterface({
 *      input: fs.createReadStream('read path');
 * });
 * 
 * readL.on('line', chunk => {})
 * readL.on('close', () => {})
 * 
 * 
 * 注册事件：
 *     - line
 *     - close
 * 注册方法：
 *     - createInterface
 * 
 */



// const fs = require('fs');

// const rs = fs.createReadStream('test/test.txt', {
//     // encoding: 'utf8', // 默认二进制buffer
//     // highWaterMark: 6, // 默认16k
// });
// const ws = fs.createWriteStream('test/copy.txt');




/* 写入方式1*********************************************** */

// let data = '';

// // 一旦开始监听就，不停地进行数据读取，触发data事件
// // 默认缓存区大小是16k，highWaterMark
// rs.on('data', chunk => {
//     console.log('____自动流动____', chunk.toString());
//     data += chunk;
// })
// rs.on('end', () => {
//     console.log('读取成功：', data);
// })


/* 写入方式2*********************************************** */

// rs.on('data', chunk => {
//     ws.write(chunk);
// })

// rs.on('end', () => {
//     // 注意需要end
//     ws.end();
//     console.log('写入成功');
// })


/* 写入方式3*********************************************** */
// 使用pipe保证读取写入速度一致
// pipe 是只有可读流才有的方法
// rs.pipe(ws);



/* 写入方式4*********************************************** */
// 手动流动写入
// let data = ''
// rs.on('readable', () => {
//     while ((chunk = rs.read()) !== null) {
//         data += chunk;
//     }
// })
// rs.on('end', () => {
//     console.log('读取完毕', data);
// })
// rs.on('close', () => {
//     console.log('读取关闭');
// })
// rs.on('error', err => {
//     console.log(err);
// })



/* 写入方式5*********************************************** */
// ws.on('open', () => {
//     console.log('打开文件');
// })

// ws.write('我是嘻嘻嘻xxx', 'utf8')
// ws.end();

// ws.on('finish', () => {
//     console.log('写入完成');
// })
// ws.on('close', () => {
//     console.log('写入关闭');
// })
// ws.on('error', err => {
//     console.log(err);
// })



/* 转换流transform*********************************************** */
// const stream = require('stream');
// const transform = stream.Transform({
//     // 要求用户必须自己实现一个transform方法
//     transform(chunk, encoding, cb) {
//         this.push(chunk.toString().toLowerCase());
//         cb();
//     }
// })

// transform.write('D');
// console.log(transform.read().toString());




/* 压缩文件*********************************************** */
// const zlib = require('zlib')
// rs
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('test/test.gz'))



   
/* 按行读取log*********************************************** */
// const readline = require('readline');
// const path = require('path');

// const logFileName = path.resolve(__dirname, 'test/info.log');

// const readStream = fs.createReadStream(logFileName);

// let num = 0;

// const readL = readline.createInterface({
//     input: readStream,
// });

// readL.on('line', data => {
//     console.log(data);
//     if (data.indexOf('log1.com') > -1) {
//         num++;
//     }
// }) 

// readL.on('close', () => {
//     console.log('读取完成', num);
// })
