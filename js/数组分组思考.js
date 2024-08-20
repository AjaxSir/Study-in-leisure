var arr = [
    {
        name: 'Tom',
        age: 18,
        gender: 'Male',

    },
    {
        name: 'Jerry',
        age: 25,
        gender: 'Male',
    },
    {
        name: 'Lily',
        age: 16,
        gender: 'Female',
    },
    {
        name: 'Bob',
        age: 22,
        gender: 'Male',
    },
    {
        name: 'Emily',
        age: 20,
        gender: 'Female',
    }
]

const groupBy = (arr, callback) => {
    const result = {}
    let generateKey = null
    if (typeof callback == 'string') {
        generateKey = (item) => item[callback]
    } else {
        generateKey = callback
    }
    for(let item of arr) {
        const prop = generateKey(item)
        if (!result[prop]) {
            result[prop] = [item]
        } else {
            result[prop].push(item)
        }
    }
    return result;
}
// console.log(groupBy(arr, (item) => `${item.age}-${item.gender}`))
console.log(groupBy(arr, 'age'))