/**
 * @description fs
 * 
 * @module 权限位：mode 
 * chmod 777
 * rwx：读|写|执行 421 = 7（8进制）
 * 
 * 权限分组：自己 | 所属组 | 其他用户
 * d 目录文件
 * p 管道文件
 * l 链接文件
 * - 普通文件
 * s .socket文件
 * 
 * ---------------------------------------
 * @module 标识位：
 * r 可读
 * r+ 可读可写
 * w 可写
 * w+ 可写可读
 * a 追加写入
 * a+ 追加写入和读
 * 
 * x排他方式
 * +相仿操作
 * 
 * ---------------------------------------
 * @module 文件描述符 fd
 * id 从3开始
 * 0 process.stdin
 * 1 process.stdout
 * 2 process.stderr
 *
 * ---------------------------------------
 * @module 文件操作（一次把内容全部读取过来）
 * readFile
 * writeFile
 * appendFile
 * copyFile
 * unlink
 * 
 * ---------------------------------------
 * @module 高级文件读取 (按需读取，非一次全部读取)
 * 适用于大文件分块读取
 * open
 * close
 * read 
 * write
 * 
 * ---------------------------------------
 * @module 检查文件权限
 * access
 * 获取文件信息
 * stat
 * 
 * ---------------------------------------
 * @module 文件操作
 * mkdir （sh: mkdir -p XXX/XXX/XXX）
 * readdir
 * mrdir
 * 
 */
const fs = require('fs');


fs.readFile('events.js', { encoding: 'utf8' }, (err, data) => { })
fs.writeFile('./test/test.txt', '测试 writeFile', { encoding: 'utf8' }, (err) => { })
fs.appendFile('./test/test.txt', 'appent content', { encoding: 'utf8' }, (err) => {
    fs.copyFile('./test/test.txt', './test/test.copy.txt', (err) => { })

    setTimeout(() => {
        fs.unlinkSync('./test/test.copy.txt');
    }, 1000);
})




// 注意第二个参数标识符，不设置会报错
fs.open('./test/test.txt', 'r', (err, fd) => {
    console.log('打开文件', fd);

    // 创建一段buffer
    const buf = Buffer.alloc(6); // byte
    // 写入buf开始位置是0，读取文件长度是6，读取文件初始位置是0
    fs.read(fd, buf, 0, 6, 0, (err, bytesRead) => {
        console.log(bytesRead, buf.toString());
        fs.close(fd, err => {
            console.log('关闭文件', fd);
        });
    });
})


fs.open('./test/test.txt', 'r+', (err, fd) => {
    console.log('打开文件', fd);

    const buf1 = Buffer.from('测试写入内容');
    console.log(buf1.length)
    // 读取buf的初始位置是3，读取文件长度是3，写入文件的起始位置6
    fs.write(fd, buf1, 3, 3, 6, (err, size, buf) => {
        console.log(size, buf.toString());
        fs.close(fd, err => {
            console.log('关闭文件', fd);
        })
    })
})


fs.access('./test/test.txt', (err) => {
    console.log('test.txt可读可写');
});

// 执行chmod -rwx test.access.txt
// fs.access('./a.js', (err) => {
//     console.log(err);
//     if (err) {
//         console.error('test.access.txt不可读可写');
//     }
// })

fs.stat('./test/test.txt', (err, data) => {
    console.log('stat', data.size);
});


try {
    fs.statSync('test/dir');
} catch (error) {
    fs.mkdirSync('test/dir');
}

console.log(fs.readdirSync('test'));

fs.rmdirSync('test/dir');
