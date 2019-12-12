/*
 * 数组相关小工具
 */

// 数组扁平化 ES10
const Flat = function(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr

    // return  arr.flat(Infinity)
}

// 去重
const Distinct = function(arr) {
    const map = {}
    const result = []
    for (const n of arr) {
        if (!(n in map)) {
            map[n] = 1
            result.push(n)
        }
    }
    return result

    // return [...new Set(arr)]
    // return Array.from(new Set(arr))
}

// 排序
const Sort = function(arr) {
    let len = arr.length
    for (let outer = len; outer >= 2; outer--) {
        for (let inner = 0; inner <= outer - 1; inner++) {
            if (arr[inner] > arr[inner + 1]) {
                //升序
                ;[arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]]
                console.log([arr[inner], arr[inner + 1]])
            }
        }
    }
    return arr
}

// 求和
const GetSum = function(arr) {
    return arr.reduce(function(prev, cur) {
        return prev + cur
    }, 0)
}

// 合并
const Merge = function(arr1, arr2) {
    return arr1.concat(arr2)
}
