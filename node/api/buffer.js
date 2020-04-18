/**
 * @module create 
 * 创建 Buffer 类 (5种方式)
 * 
 */
var buf;

// 1. Buffer.alloc(size[, fill[, encoding]])：返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
var buf1 = Buffer.alloc(8);
console.log(buf1);

// 2. Buffer.allocUnsafe(size)：返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
var buf2 = Buffer.allocUnsafe(8);
console.log(buf2);

// 3. Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
var buf3 = Buffer.from([1, 2, 3]);
console.log(buf3);

// 4. Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
var buf4 = Buffer.from('test');
console.log(buf4);

// 5. Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
var buf5 = Buffer.from(buf4);
console.log(buf5, buf5 === buf4);
console.log('_____________')


/**
 * @module write
 * 写入缓冲区
 * buf.write(string[, offset[, length]][, encoding])
 * 
 */
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : " + len);
console.log('_____________')


/**
 * @module read
 * 从缓冲区读取数据
 * buf.toString([encoding[, start[, end]]])
 *
 */

buf = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}

console.log(buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii', 0, 5));   //使用 'ascii' 编码, 并输出: abcde
console.log(buf.toString('utf8', 0, 5));    // 使用 'utf8' 编码, 并输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用默认的 'utf8' 编码, 并输出: abcde
console.log('_____________')




/**
 * @module toJSON
 * 将 Buffer 转换为 JSON 对象
 * buf.toJSON()
 *
 */
buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
var json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

var copy = JSON.parse(json, (key, value) => {
    // value = { type: 'Buffer', data: [ 1, 2, 3, 4, 5 ] }
    return value && value.type === 'Buffer'
        ? Buffer.from(value.data)
        : value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);
console.log('_____________')



/**
 * @module concat
 * 缓冲区合并
 * Buffer.concat(list[, totalLength])
 *
 */
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
console.log('_____________')




/**
 * @module copy
 * 拷贝缓冲区
 * buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 * targetBuffer - 要拷贝的 Buffer 对象。
 * targetStart - 数字, 可选, 默认: 0
 * sourceStart - 数字, 可选, 默认: 0
 * sourceEnd - 数字, 可选, 默认: buffer.length
 *
 */
var buf1 = Buffer.from('abcdefghijkl'); // target buf
var buf2 = Buffer.from('RUNOOB'); // source buf

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());
console.log('_____________')




/**
 * @module slice
 * 浅拷贝
 * buf.slice([start[, end]])
 *
 */
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0, 2);
buffer2.write('1');
console.log("buffer2 content: " + buffer2.toString());
console.log("buffer1 content: " + buffer1.toString());
console.log(buffer2 !== buffer1);
console.log('_____________')

/**
 * @module 深拷贝
 *
 */

// 方法1
var deepbuf = Buffer.allocUnsafe ? Buffer.allocUnsafe(buffer1.length) : new Buffer(buffer1.length);
buffer1.copy(deepbuf);

// 方法2
// var deepbuf = Buffer.from(buffer1);

// test
buffer1.write('test');
console.log("deepbuf content: " + deepbuf.toString());
console.log("buffer1 content: " + buffer1.toString());
console.log(deepbuf !== buffer1);
console.log('_____________')



/**
 * @module length
 * buf.length;
 *
 */
var buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);
console.log('_____________')