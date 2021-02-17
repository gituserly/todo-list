/**
 * 1. 返回promise
 * 2.传入的值判断是否是数组
 * 3.如果是数组，在判断是否是primise
 * 4.全部成功返回resolve
 *5. 注意返回的顺序
 */
const PromiseALL = (promall) => {
    new Promise(function(resolve, reject) {
        if (!Array.isArray(Promall)) {
            reject(new Error("don't array"));
        } else {
            Promise.resolve(promall);
        }
        const i = 0;
        if (i < promall.length) {
            i++;
        }
    });
};

function promiseAll(promises) {
    // 返回一个promise实例
    return new Promise((resolve, reject) => {
        // 做一个判断参数是否是数组
        if (!Array.isArray(promises)) {
            return reject(new TypeError("arguments must be Array"));
        }
        let count = 0,
            arr = new Array(promises.length);
        // 建立一个数组,数组长度为pr.len
        for (let i = 0; i < promises.length; i++) {
            // 运用promise特性 只会有一个状态
            Promise.resolve(promises[i]).then(
                (val) => {
                    count++;
                    arr[i] = val; // 把每次返回成功的数据添加到数组中
                    if (count === promises.length) {
                        // 数据接收完成
                        return resolve(arr);
                    }
                },
                (rej) => reject(rej)
            );
        }
    });
}