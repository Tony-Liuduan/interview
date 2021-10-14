/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-08 17:01:20
 * @LastEditTime 2021-10-14 14:49:49
 */
const fetch = require('node-fetch')
const cheerio = require('cheerio').load
// const createThrottle = require('./createThrottle')
// const createThrottle = require('./asyncThrottle')

// code
const throttle = createThrottle(2)
const urls = ['https://juejin.im', 'https://baidu.com', 'https://bing.com', 'https://jd.com', 'https://xiaomi.com', 'https://zhihu.com']
Promise.all(urls.map(url => throttle(async () => {
    console.log('Processing', url)
    const res = await fetch(url)
    const data = await res.text()
    const $ = cheerio(data)
    return $('title').text()
}, url)))
    .then(titles => console.log('Titles:', titles))
    .catch(err => console.error(err.stack))



function createThrottle(max) {
    return function throttle(fetchFn) {
        const pool = [];
        let cur = 0;
        return new Promise((resolve, reject) => {
            function exex() {
                if (cur < max) {
                    cur++;
                    fetchFn()
                        .then((res) => {
                            resolve(res);
                            cur--;
                            if (pool.length) {
                                pool.shift()();
                            }
                        })
                        .catch(e => {
                            reject(e);
                            cur--;
                            if (pool.length) {
                                pool.shift()();
                            }
                        })
                } else {
                    pool.push(exex);
                }
            }
            exex();
        });
    };
}

