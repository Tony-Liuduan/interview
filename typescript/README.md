# Typescript

## Typescript术语和集合术语对照表

| Typescript术语      | 集合术语      | 举例                                             |
|---------------------|---------------|--------------------------------------------------|
| never               | 空集          |                                                  |
| literal type        | 单值集合      | `type A= 'A' // 单值集合 { 'A' }`                |
| value 可赋值给 T    | value ∈ T     |                                                  |
| T1 assignable to T2 | T1是T2的子集  |                                                  |
| T1 extends T2       | T1是T2的子集  |                                                  |
| T1 \| T2            | T1和T2的并集  | `type AB = 'A' | 'B' // 集合的并集 { 'A', 'B' }` |
| T1 & T2             | T1 和T2的交集 | `type AB = 'A' & 'B' // 集合的交集 never`        |
| unknown             | universal set |                                                  |

## 类型空间(type-space) vs 值空间(value-space)

* class 和 enum 同时属于 type-space 和 value-space

## interface vs type

* inteface无法应用于 union type | intersection type | conditional type | tuple
* interface 可以augmented,而type不可以

```ts
// 混合
type AorB = 'A' | 'B'
type NamedVariable = (Input | Output) & { name: string}
type Pair = [number,number]

// 重载
// inner
interface IState {
    name: string;
    capital: string;
}
// outer
interface IState {
    population: number
} // 添加额外的props

const wyoming: IState = {
    name: 'Wyoming',
    capital: 'Cheyenne',
    population: 500_000
}
```

## 最佳原则

1. 限制any的使用
2. 优先使用类型声明而非类型断言
3. 尽可能的提取公共函数类型
4. 使用泛型减少冗余类型
5. function 显示表明 this 类型
6. 使用 is 好于 boolean

## 引用

* <https://zhuanlan.zhihu.com/p/104311029>
* <https://blog.staleclosure.com/effective-typescript/>
