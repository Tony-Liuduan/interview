const pp = new Promise(res => {
    res(new Promise(re => {
        re(1000);
    }));
})
    .then(res => {
        console.log(res);
        // 1. return thenable
        // return {
        //     then(r) {
        //         setTimeout(() => {
        //             r(
        //                 {
        //                     then(r1) {
        //                         console.log(r1);
        //                         r1(8)
        //                     }
        //                 }
        //             )
        //         }, 0);
        //     }
        // }

        // 2. return promise 实例
        return new Promise(rr => {
            rr("new Promise rr");
        })
    })
    .then(res => {
        console.log(res);
        return pp;
    })