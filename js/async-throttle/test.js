/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-08 17:01:20
 * @LastEditTime 2020-07-09 10:02:32
 */
const fetch = require('node-fetch')
const cheerio = require('cheerio').load
// const createThrottle = require('./createThrottle')
const createThrottle = require('./asyncThrottle')

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