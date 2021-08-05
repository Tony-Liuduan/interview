/**
 * @fileoverview any
 * 
 * *限制any的使用*
 * *any相当于放弃了类型检测*
 * 1.any掩盖了你的类型设计
 * 2.any破坏了检查约定
 * 3.any破坏了自动补全
 * 4.any对重构代码不友好
 * 5.any对 typescript 暗中破坏新人新任度，当使用 ts use any 会可能导致静态检查 ok，but runtime 时 error，暗中让人失去对 ts 的信心
 * 
 * 
 * 
 * *never unkonw any 区别*
 * never  空集 'A' & 'B', 其声明类型不为 "void" 或 "any" 的函数必须返回值
 * unkonw 未设置类型, 其声明类型不为 "void" 或 "any" 的函数必须返回值  
 * any    跳过类型检查, 可以没有返回值
 */


/**
 * @description Item5: Limit Use of the any Type
 * 
 * typescript 中可以通过 any 跳过类型检查，这对新手来说是有诱惑力的，但是也是一种偷懒的行为，在使用 any 前你需要知道他有什么危险
 * any 破坏性观察
 * 
 */

// 举例 1：any掩盖了你的类型设计
let age = 1;
age = '12' as any;
age += 1;
console.log(age); // '121' 潜在错误，类型被改变了


// 举例 2：break contracts
function calculateAge(birthDate: Date): number {
    return +birthDate;
}
const birthDate: any = '1990-01-19';
calculateAge(birthDate);


// 举例 3：破坏了自动补全
const person = { firstName: 'John', lastName: 'Haha' };
//person.;
interface Person {
    first: string;
    lastName: string;
}
// 即便类型定义中属性名改变后也会提示
const formatName = (p: Person) => `${p.first}${p.lastName}`;
const formatNameAny = (p: any) => `${p.firstName}${p.lastName}`;


// 举例 4：对重构代码不友好，在代码重构时不易发现 bug
function renderSelector(props: ComponentProps) { }
let selectedId: number = 0;
function handleSelectItem(item: any) {
    selectedId = item.id;
}
renderSelector({ onSelectItem: handleSelectItem });

interface ComponentProps { onSelectItem: ({ id: number }) => void };
// interface ComponentProps { onSelectItem: (id: number) => void };


/**
 * @description 原则1. 缩小 any 的适用范围
 */
function f1() {
    const x: any = foo(); // 不建议，后续的x都是any了
    console.log(x)
}

function f2() {
    const x = foo();
    console.log(x as any) // 建议，只有这里是 any
}

function foo() {

}





/**
 * @description 原则2. 使用更细化的 any
 */
function getLengthBad(arr: any) {
    return arr.length; // 不推荐
}
function getLength(arr: any[]) {
    return arr.length //推荐
}
const numArgsBad = (...args: any) => args.length // Return any 不推荐
const numArgs = (...args: any[]) => args.length // Return number 推荐





/**
 * @description 原则3. 优先使用 unknown 而非 any
 */
// ❌  bad: 使用 any 代码在该报错的地方并没有报错
// function parseYAML(yaml: string): any {}
// const book = parseYAML(`
//     name: effective typescript
//     author:yj
// `)
// console.log(book.title) // no error
// book('read') // no error


// ✅  better: 使用 unknown
function parseYAML(yaml: string): unknown { return yaml };
const book = parseYAML(`
    name: effective typescript
    author:yj
`)
console.log(book.title) // error
book('read') // error
interface Book {
    name: string;
    author: string;
}
function isBook(val: unknown): val is Book {
    return (
        typeof val === 'object' && val !== null && 'name' in val && 'author' in val
    );
}
if (isBook(book)) {
    console.log(book.author)
}



/**
 * @description 原则4. 安全的签名不安全的实现
 * 
 * 使用重载时，只有函数签名对外可见， 而函数实现对外不可见
 */

// 类型安全的签名
export function useImmer<S = any>(initialValue: S | (() => S)): [S, (f: (draft: Draft<S>) => void | S) => void];
// 没那么安全的实现
export function useImmer(initialValue: any) {
    const [val, updateValue] = useState(initialValue);
    return [
        val,
        useCallback(updater => {
            updateValue(produce(updater));
        }, [])
    ];
}
type Draft<T> = T[];

