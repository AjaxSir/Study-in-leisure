const console  = require('console')
function getName(name) {
    return new Promise(function (resolve, reject) {
        resolve(`name${name}`);
    })
}

let str = '1,24,42-42==4242----'


async function ds() {
    const res = str.match(/\d+/g)
    let result = str
    // 并行处理
    const res1 = str.match(/\d+|\D+/g)
    const arr = res1.map(e => /\d+/g.test(e) ? getName(e) : e)
    Promise.all(arr).then(r => {
        console.log(r.join(''), 'r')
    })
    // 串行处理
    for(let i of res) {
        const d = await getName(i)
        result = result.replace(i, d)
    }
    console.log(result, 'result')
}
console.log(str)
// ds()

String.prototype.asyncReplaceAll = function(reg, callback) {
    if (typeof callback === 'string'){
        return this.replaceAll(reg, callback);
    }
    if (typeof callback !== 'function'){
        throw new Error('callback must be a function');
    }
    let pattern
    if (typeof reg === 'string') {
        // 允许用户以字符串的形式传递正则表达式模式，然后将其安全地转换为实际的正则表达式对象
        pattern = new RegExp(reg.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'g');
    } else if(reg instanceof RegExp){
        if (!reg.global) {
            throw new Error('RegExp must be global');
        }
        pattern = new RegExp(reg)
    } else {
        throw new Error('reg must be a string or RegExp');
    }
    let match;
    let result = []
    let lastIndex = 0;
    while((match = pattern.exec(this)) !== null){
        
        let prefix = this.slice(lastIndex, match.index)
        lastIndex = match.index + match[0].length
        result.push(prefix)
        result.push(callback(match[0]))
    }
    Promise.all(result).then(res => {
        console.log(res.join(''), 'join')
    })
}
str.asyncReplaceAll(/\d+/g, s => getName(s))