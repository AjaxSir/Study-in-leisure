Promise.MyAll = function(promises) {
    return new Promise((resolve, reject) => {
        // peomises.length 判断 promises 长度不能用length 只要是可迭代的对象即可 可能是map 
        var count = 0;
        var result = [];
        var fullCount = 0;
        var i = 0;
        for (let p of promises) {
            const index = i
            i++
            count++
            Promise.resolve(p).then(res => {
                result[index] = res
                fullCount++
                if(fullCount === count) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
            
        }
    })
}

Promise.MyAll([1,2,3,4]).then(function(values) {
    console.log(values)
})