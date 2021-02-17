function PromiseAll(promises) {
    return new Promise(
        function(resolve, reject) {
            if (!Array.isArray(promises)) {
                return reject("don't array")
            }
            const arr = new Array(promises.length);
            let len = 0;
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(
                    (val) => {
                        arr[i] = val;
                        len = len + 1;
                        if (len === promises.length) {
                            resolve(arr)
                        }
                    }, (rej) => { reject(rej) }
                )
            }
        }
    )
}