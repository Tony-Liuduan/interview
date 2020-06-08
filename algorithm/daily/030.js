/**
 * @fileoverview 030 parseInt
 * @author liuduan
 * @Date 2020-06-08 15:35:34
 * @LastEditTime 2020-06-08 15:35:45
 */
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {

    // let start = 0;
    // while (str[start] === ' ') {
    //     start++;
    // }

    // let flag = str[start] !== '-';
    // if (str[start] === '-' || str[start] === '+') {
    //     start++;
    // }
    // let cur = start;
    // let num = 0;
    // while (cur < str.length && /\d/.test(str[cur])) {
    //     let v = str[cur];
    //     num = num * 10 + v * 1;
    //     if ((num | 0) !== num) {
    //         num = 2 ** 31;
    //         break;
    //     }
    //     console.log(v);
    //     cur++;
    // }

    // num = flag ? num : -num;

    // return (num | 0) === num ? num : num - 1;

    const auto = new Automaton();

    for (let v of str) {
        auto.get(v);
    }

    return auto.res * auto.signed;
};



class Automaton {
    constructor() {
        this.status = 'start';
        this.signed = 1;
        this.res = 0;
        this.map = new Map([
            ['start', ['start', 'signed', 'in_number', 'end']],
            ['signed', ['end', 'end', 'in_number', 'end']],
            ['in_number', ['end', 'end', 'in_number', 'end']],
            ['end', ['end', 'end', 'end', 'end']],
        ]);
    }

    getIndex(char) {
        if (char === ' ') {
            return 0;
        }

        if (/-|\+/.test(char)) {
            return 1;
        }

        if (/\d/.test(char)) {
            return 2;
        }

        return 3;
    }

    get(char) {
        this.status = this.map.get(this.status)[this.getIndex(char)];

        if (this.status === 'signed') {
            this.signed = char === '-' ? -1 : 1;
            return;
        }

        if (this.status === 'in_number') {

            this.res = this.res * 10 + (char - 0);
            if ((this.res | 0) !== this.res) {
                this.res = this.signed > 0 ? 2 ** 31 - 1 : 2 ** 31;
                this.status = 'end';
            }
        }
    }
}