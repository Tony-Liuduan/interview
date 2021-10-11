/* 
async function getTotalPicNum(user1, user2) {
    const num1 = await getPicNum(user1);
    const num2 = await getPicNum(user2);

    return num1 + num2;
}

async function run() {
    await getTotalPicNum('liming', 'hoho');
} 
*/

/* 代数效应 */
/* function getTotalPicNum(user1, user2) {
    const num1 = getPicNum(user1);
    const num2 = getPicNum(user2);

    return num1 + num2;
}

function getPicNum(name) {
    const num = perform name;
    return num;
}

function run() {
    try {
        getTotalPicNum('liming', 'hoho');
    } handle(who) {
        switch (who) {
            case 'liming':
                resume with 123;
            case 'hoho':
                resume with 12;
            default:
                resume with 0;
        }
    }
} */

/**
 * 
 * fiber 结构
FiberRootNode
    RootFiber
        App
            P
                text
                text


TODO: 代数效应 ??
TODO: generator ??

调度器 scheduler
协调器 reconcile 
    * render 阶段 (递归 create workInProgress)
渲染器 renderer  
    * commit 阶段 (渲染到视图前、中、后)
    * 将变化的节点渲染到视图上
 
* FiberRootNode 双缓存：在内存中构建并直接替换的技术叫做双缓存，防止中间计算过程出现白屏
    当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树
    
    * current        (alternate)
    * workInProgress (alternate)
        
        * currentFiber.alternate        === workInProgressFiber
        * workInProgressFiber.alternate === currentFiber

其中
mount  阶段 无 currentFiber, 有 workInProgressFiber
update 阶段 有 currentFiber, 有 workInProgressFiber
    



## react 执行入口 render function

1. render // react-dom 
* FiberRootNode tag = 3
* createFiber 创建根节点
    * 创建 RootFiber = createFiber() = new FiberNode(tag[HostRoot 3], pendingProps, key, mode) 

2. updateContainer 创建完根节点后开始进行首屏渲染
* scheduleUpdateOnFiber 调度这次更新      (----------- 调度器在这 -----------)
* performSyncWorkOnRoot 调度完成后从根节点执行这次更新
        * renderRootSync                (----------- 协调器在这 -----------)
            * workLoopSync (在这里创建 workInProgress)
                * performUnitOfWork
                    * beginWork (递) beginWork 和 completeWork 一一对应
                    * completeWork (归)
        * commitRoot                    (----------- 渲染器在这 -----------)    
            * commitBeforeMutaionEffects 渲染到视图前
            * commitMutaionEffects       渲染到视图中
                * commitMutaionEffects_begin
                * commitMutaionEffects_complete
            * onCommitRoot               layout 阶段
*/



/**
 * *JSX
 * 
 * // react
 * createElement
 *   内部调用 ReactElement 返回一个合法的 element
 *      $$typeof 标记是否合法
 *      type
 *      tag
 * 
 * 
 * 
 */

function workLoopSync() {
    // Already timed out, so perform work without checking if we need to yield.
    while (workInProgress !== null) {
        performUnitOfWork(workInProgress);
    }
}

function performUnitOfWork(fiber) {
    // 执行beginWork 

    // RootFiber.memoizedState 检出 nextFiber = App
    // reconcileChildren
    // createFiberFromElement
    // createFiberFromTypeAndProps
    // reconcileChildrenArray 多个子节点走这个方法  while 循环子节点同步一口气创建出 fiber 链表，子节点的子节点会挂载在 pendingProps 属性上，待进入当前 workInProgress 后创建对应的 fiberNode

    if (fiber.child) {
        performUnitOfWork(fiber.child);
    }

    // 执行completeWork

    if (fiber.sibling) {
        performUnitOfWork(fiber.sibling);
    }
}

/**
 * *beginWork: beginWork后会创建子Fiber节点
 * 
 * 根据 current === null ? 判断是 mount 还是 update
 * 
 * // react-dom
 * beginWork(current, workInProgress)
 *      HostRoot (有 host 就是原生 dom) #root
 *      App
 * 深度优先遍历过程：当 workInProgress 节点没有子节点 或遍历完所有子节点后会进入 completeWork
 *      没有子节点，去相邻兄弟节点 beginWork-completeWork
 *      兄弟节点都结束后，去父节点 completeWork
 * *注意：当节点只有一个文本子节点时不会生成自己的 fiber 节点
 * 
 * 
 * beginWork 内部执行方法：
 *  updateHostComponent
 *      reconcileChildren 标记 effectTag
 *          mountChildFibers = ChildReconciler(false)       // 不做 effectTag 标记
 *          reconcileChildFibers = ChildReconciler(true)    // 去做 effectTag 标记
 *          * diff 算法是在这作用的，用于生成 effectTag [update]，[mount]阶段是无 diff && effectTag 的
 *      reconcileChildFibers
 * 
 * 二进制形式存储 effectTag: Placement, Update, 通过连续按位或操作，就可以通过得到多个合并的 effectTag
 * 
 * beginWork 的执行结果是：给 workInProgress.child 赋值
 * workInProgress.child = reconcileChildFibers();
 * 
 * 
 * *[update] 阶段
 * 更新时判断是创建新的 FiberNode 是根据 props 和 type 进行 diff 比较
 * 一致则复用，然后再把对应的子节点 clone 过来一份
 * 不一致则走创建 FiberNode && reconcileChildren 打 effectTag 逻辑
 * 
 * 
 * 然后通过 workLoopSync while workInProgress 循环执行 performUnitOfWork-beginWork-completeWork
 */

/* 
// reconcileChildren 
    
export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);

deleteChild
deleteRemainingChildren

effectTag = Deletion
effectTag = Placement 
*/

// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;

/**
 * *completeWork
 * 
 * 1. [mount] 创建 dom 节点 instance = createInstance() 
 * workInProgress.stateNode = domInstance
 * 
 * 
 * 2. [mount] 挂载子节点 appendAllChildren
 * while && 递归 挂载
 * 先查找 child，然后查找 siblein
 * 到rootFiber时，就已经有一个构建好的离屏DOM树，这样操作完到 App FiberNode 时，其上的 stateNode 是 null，  AppFiberNode.child.stateNode 是构建好的 dom 树
 * 
 * 3. [mount] workInProgress.stateNode = domInstance
 * 
 * 
 * 4. [mount] 设置 dom 节点属性
 * finalizeInitialChildren
 * * 初始化dom 事件监听 && 内部属性
 * 
 * 
 * *5. [update] updateHostComponent
 * diff props 返回一个需要更新的属性名组成的数组给 workInProgress.updateQueue
 * 
 * 
 * 6. [mount && update] update 阶段：构建 workInProgress.updateQueue 链
 * 将有 effectTag 的 fiber 挂载在父级 fiber 的末尾，并返回下一个 workInProgress
 */



/**
 * *completeUnitOfWork* 构建 effectList 单向链表
 * 
 * 所有有 effectTag 的 FiberNode 都会被追加在 effectList 中
 * 最终形成一条以 rootFiber.firstEffect 为起点的单向链表
 * 
 *                        nextEffect         nextEffect
 * rootFiber.firstEffect -----------> fiber -----------> fiber
 * 
 */

/**
 * 
 * *finishedWork
 * 
 * 构建出的 finishedWork 是新的 fiber-tree
 * 都是新的 fiberNode，但是 stateNode 不变，current 和 workInProgress 上的 stateNode 是一致的
 * 这个新的 workInProgress 就对应新的 dom tree，不含已删除的 fiberNode
 * 并且产出了新的 effectTagList 
 * commit 阶段就是 遍历 effectTagList 修改 stateNode 的过程
 */

/**
 * 首次渲染
 * 
 * 会将 App fiberNode 标记为 place，即 flag = 3，来渲染节点
 */

function appendAllChildren(parent, workInProgress) {
    var node = workInProgress.child;

    while (node !== null) {
        // 1. 先处理子节点
        if (node.tag === 'HostComponent' || node.tag === 'HostText') {
            // dom tag 或 文本 挂载
            parent.appendChild(node.stateNode);
        } else if (node.child !== null) {
            // 如果不是 dom tag 就继续往子节点查找
            node.child.return = node;
            node = node.child;
            continue;
        }

        // 若果查询回到原点则跳出
        if (node === workInProgress) {
            return;
        }

        // 2. 处理兄弟节点
        // 当相邻节点是 null 时，就往其父节点查找
        while (node.sibling === null) {
            if (node.return === null || node.return === workInProgress) {
                return;
            }
            node = node.return;
        }

        // 当没有子节点是 null，查询其兄弟节点
        node.sibling.return = node.return;
        node = node.sibling;
    }
}

/**
 * update 时， beginWork 创建 workInProgressNode 是否能复用 currentFiberNode 条件：
 * 
 * 1. type  相等
 * 2. props 相等
 */

const oldProps = current.memoizedProps;
const newProps = workInProgress.pendingProps;


/**
 * *commit 阶段*
 * before mutation
 *      1. 调用 getSnapshotBeforeUpdate
 *      2. 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑
 *      3. 这个阶段会把 useEffect 中的更新推入到异步队列中 （异步执行 flushSyncCallbackQueue）
 *              当一个FunctionComponent含有useEffect或useLayoutEffect，他对应的Fiber节点也会被赋值 effectTag
 *              在flushPassiveEffects方法内部会遍历rootWithPendingPassiveEffects（即effectList）执行effect回调函数
 *              useEffect 异步执行的原因主要是防止同步执行时阻塞浏览器渲染
 *
 * mutation
 *     1. 遍历effectList 从 firstEffect 开始遍历
 *     2. dom 操作，属性更新
 *     3. 执行 useLayoutEffect hook 的销毁函数
 *     4. delect tag 时执行 卸载组件方法
 *     *5. root.current = finishedWork; current Fiber树已经指向更新后的Fiber树，在生命周期钩子内获取的DOM就是更新后的
 *
 * layout
 *     1. 遍历 effectList
 *     2. 执行 componentDidMount 或 componentDidUpdate 生命周期钩子，从 lastEffect 开始遍历
 *     3. 调用 useLayoutEffect hook的回调函数
 *     4. 调度 useEffect的销毁与回调 函数，useEffect则需要先调度，在Layout阶段完成后再异步执行
 *     5. 获取DOM实例，更新ref
 *
 *
 *
 * flushSyncCallbackQueue
 * 立即进行同步工作
 * 在 layout 后，会触发 useLayoutEffect 中执行setState的立即触发同步更新渲染
 */




/**
 * *diff
 * 本质是 diff jsx 和 current Fiber，生成 workInProgress Fiber
 *
 * O(n3)
 *
 * *Diff 三原则：
 *
 * 1. diff 同级节点之间才做 diff
 * 2. diff 对比 (key && type)，不同则不复用，如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点
 * 3. 当渲染顺序改变，可通过 key 标记节点可以复用，避免因为第 2 条直接销毁
 *
 *
 * *Diff 两类：
 * 1. 当newChild类型为object、number、string，代表同级只有一个节点
 * 2. 当newChild类型为Array，同级有多个节点
 *
 * *Diff 单节点：
 * 1. 判断 dom 节点(stateNode)是否可以复用
 * 2. 可以复用：clone 一份 fiberNode
 * 3. 不能复用：标记 Dom effectTag 删除，生成一个新的 fiberNode with stateNode
 *
 * 具体 diff 过程：
 * 1. currentFiber.key         === jsx.key
 * 2. currentFiber.elementType === jsx.type
 *
 * key 不同则 标记当前 fiber 节点删除
 * key 相同则 进入 type 判断，type 不一致则标记当前 fiber 节点及所有兄弟节点删除
 *
 * *Diff 多节点 Array：
 * 1. 第一轮遍历：处理更新的节点
 * 2. 第二轮遍历：处理剩下的不属于更新的节点
 *
 *
 * *第一轮遍历
 * 原则：遍历新的
 *      当 key 不一致则跳出结束第一轮遍历
 *      当 key 一致，type 不一致，标记老的 delete effectTag，继续往下遍历
 *
 * 遍历结果：
 * 1. 刚好新老都编辑结束，则停止，不遍历第二轮，标记 update effectTag
 * 2. 老遍历结束，新没遍历完，继续遍新剩余的，标记 replace effectTag
 * 3. 老没遍历完，新遍历结束，继续遍老剩余的，标记 delete effectTag
 * 4. 新老都没遍历完...
 *
 *
 * *第二轮遍历 （场景 4）
 *
 * 1. 将老的剩余的放到 Map 中，var lastPlacedIndex = 0，lastPlacedIndex 表示最后一个可复用的老节点
 * 2. 遍历新的剩余节点，找到 map 中对应老节点的 index，index >= lastPlacedIndex ? 不移动 ：标记移动 replace effectTag
 *
 */


/**
 *
 * *批处理
 * legacy模式在合成事件中有自动批处理的功能，但仅限于一个浏览器任务。非React事件想使用这个功能必须使用 unstable_batchedUpdates
 * blocking模式和concurrent模式下，所有的setState在默认情况下都是批处理的
 *
 */
