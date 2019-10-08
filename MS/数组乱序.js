function shuffle(array) {
    let _array = array.concat();
    for (let i = _array.length; i--;) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = _array[i];
        _array[i] = _array[j];
        _array[j] = temp;
    }
    return _array;
}


// Fisher–Yates Shuffle
function shuffle2(array) {
    let copy = [], n = array.length, i;
    while (n) {
        i = Math.floor(Math.random() * n--);
        copy.push(array.splice(i, 1)[0]);
    }
    return copy;
}


//test
const array = [23, 45, 6, 32, 7, 8, 34, 5, 6, 7, 83, 45, 6, 657, 8, 6, 4, 68, 345];

console.log(shuffle2(array));
