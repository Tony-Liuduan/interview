/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-29 17:57:45
 * @LastEditTime 2020-06-29 18:30:49
 */
/**
 *
 * @param {array} a 需转换数组
 */
function madeTree(a) {
    /**
     *
     * @param {string} s 父级id
     * @param {number} n 需转换数字
     */
    const getId = (s, n) => (n < 10 ? `${s}0${n}` : `${s}${n}`)

    /**
     * 递归转换函数
     * @param {array} c 当前需转换数组
     * @param {array} p 目标数组
     * @param {string} pId 父级id
     */
    const g = (c, p = [], pId = '') => {
        if (!Array.isArray(c) || c.length === 0) {
            return p
        }
        // 递归取出第一个元素操作
        const [first, ...other] = c
        const fIndex = p.findIndex(
            item => typeof item === 'object' && item.name === first
        )
        if (fIndex > -1) {
            const { child = [], id, ...oTemp } = p[fIndex]
            if (other.length > 0) {
                p[fIndex] = { ...oTemp, id, child: g(other, child, id) }
            }
        } else {
            const cId = getId(pId, p.length + 1)
            const childObj = other.length > 0 ? { child: g(other, [], cId) } : {}
            p.push({
                id: cId,
                name: first,
                ...childObj
            })
        }
        return p
    }
    return a.reduce((pre, curr, index) => {
        return g(curr, pre)
    }, [])
}

const source = [
    ['hello', 'hill'],
    ['hello', 'jack'],
    ['world', 'foo', 'jerry'],
    ['world', 'foo', 'peter', 'tom'],
    ['world', 'bar']
]


function createTree(arr) {
    function TreeNode(value, id) {
        this.value = value;
        this.children = null;
        this.id = id;
    }

    let map = {}

    for (const item of arr) {
        let path = ''
        for (const v of item) {
            let id = path + '-' + v;
            let node = new TreeNode(v, id);
            if (!map[path]) {
                map[path] = {
                    [v]: node,
                };
            } else {
                map[path][v] = node;
            }
            path = id;
        }
    }

    let path = '';
    let cur = map[path];


    function dfs(target, path) {

        let _path = path;
        for (const key of Object.keys(target)) {
            _path += '-' + key;
            let children = map[_path];
            if (children && target[key]) {
                dfs(children, _path)
                target[key].children = Object.values(children);
            }
            _path = path;
        }

    }
    dfs(cur, path);

    return map[''];

}

createTree(source);