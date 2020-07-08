/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-06 15:42:35
 * @LastEditTime 2020-07-06 15:53:32
 */
// var versions = ['1.45.0', '1.5', '6', '3.3.3.3.3.3.3']
// 要求从小到大排序，注意'1.45'比'1.5'大

var sorted = ['1.5', '1.45.0', '3.3.3.3.3.3', '6']

function sortVersion(versions) {
    return versions.sort((a, b) => {
        let arr = a.split('.');
        let brr = b.split('.');

        let al = arr.length;
        let bl = brr.length;

        let l = Math.max(al, bl);

        let cur = 0;

        while (cur < l) {

            if (arr[cur] == null) {
                return -1;
            }

            if (brr[cur] == null) {
                return 1;
            }

            if (+arr[cur] > +brr[cur]) {
                return 1;
            }

            if (+arr[cur] < +brr[cur]) {
                return -1;
            }
            cur++;
        }

        return 0;
    });
}

var x = sortVersion(sorted);
console.log(x);


