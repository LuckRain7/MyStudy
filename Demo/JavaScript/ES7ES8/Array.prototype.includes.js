
let ary = ["1", '2', '3', '4', 'a', 'c', [1, 2], NaN]
// includes 第二个参数是开始检测的索引位置
// 不能对引用数据类型进行检测
// 可以对NaN进行检测， indexOf不能进行检测
// 数组进行绝对比较

console.log(ary.includes('1',1)) //false
console.log(ary.includes([1, 2])) //false
console.log(ary.includes(NaN)) //true
