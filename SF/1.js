/*
 * 想办法先随机生成100个随机字符串整数扔到一个数组里，
 * 比如var arr = ['1'，'2'，'3' ....]，arr的长度是100，
 * 再设计一个算法去重，不允许用new set。
*/
var arr = Array.from({ length: 100 }).map(() =>
    String(Math.floor(Math.random() * 100))
)
var newArr = [];

arr.forEach((val) => {
    if (newArr.indexOf(val) < 0) {
        newArr.push(val)
    }
})
console.log('sucess', newArr)