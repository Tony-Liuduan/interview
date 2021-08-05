/**
 * @description 例1 TypeScript会确保它有该类型的属性而不是其他属性
 */
interface Room {
    numDoors: number;
    ceilingHeightFt: number;
}
const room1: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
    // ~~~~~~~~~~~~~~~~~~ Object literal may only specify known properties,
    //                    and 'elephant' does not exist in type 'Room'
};


/**
 * @description 例2 通过一个 obj 中转一下就能绕过类型校验
 */
const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
};
const room2: Room = obj;  // OK”



// 例3
interface Options {
    title: string;
    darkMode?: boolean;
}
function createWindow(options: Options) {
    if (options.darkMode) {
        // ...
    }
    // ...
}
createWindow({
    title: 'Spider Solitaire',
    darkmode: true
    // ~~~~~~~~~~~~~ Object literal may only specify known properties, but
    //               'darkmode' does not exist in type 'Options'.
    //               Did you mean to write 'darkMode'?
});


// 例4
const o1: Options = document;  // OK
const o2: Options = new HTMLAnchorElement;  // OK”
