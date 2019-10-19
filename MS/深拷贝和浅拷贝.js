// 深拷贝

// let obj = { name: 'zzy', age: 18 }


function a(obj) {
    // 有缺陷 不能实现复杂的拷贝  function
    return JSON.parse(JSON.stringify(obj))
}

// 递归拷贝
// hash的使用
function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return obj //判断空值
    if (obj instanceof Date) return new Date(obj) //判断日期
    if (obj instanceof RegExp) return new RegExp(obj)
    // 如果是函数或者普通值的话 不需要深拷贝
    if (typeof obj !== 'object') return obj
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj)

    let cloneObj = new obj.constructor
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}

let obj = { name: 'zzy', age: 18 }
obj.other = obj
let d = deepClone(obj)
d.age = 20
console.log(obj)
console.log(d.other)
