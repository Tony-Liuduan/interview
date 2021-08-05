class C {
    vals = [1, 2, 3];
    logSquares(this: C) { // 显示表明要求的this类型
        for (const val of this.vals) {
            console.log(val * val);
        }
    }
}


const c = new C();
c.logSquares();


const c2 = new C();
const method = c.logSquares;
method();