const fetch = require('node-fetch')

const fetchWithRetry = fetchWithRetryFactory(3);
fetchWithRetry(
    async () => {
        const res = await fetch('https://juejinx.com/');
        const data = await res.text();
        return data;
    }
)
    .then(res => console.log('content:', res))
    .catch(err => console.error(err.stack))


function fetchWithRetryFactory(time) {
    return function fetchWithRetry(requestFn) {
        return new Promise((resolve, reject) => {
            let cur = 0;
            function exec() {
                console.log('exec', cur, time);
                cur++;
                requestFn()
                    .then((res) => {
                        resolve(res);
                    })
                    .catch(e => {
                        if (cur >= time) {
                            reject(e);
                            return;
                        }
                        exec();
                    });
            }
            exec();
        });
    }
}

