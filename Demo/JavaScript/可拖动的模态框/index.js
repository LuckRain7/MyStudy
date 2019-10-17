let model = document.getElementById('model')

// 居中显示
model.style.left = (window.innerWidth - 450) / 2 + 'px'
model.style.top = (window.innerHeight - 350) / 2 + 'px'

let x, y,
    isDrop = false //移动状态的判断鼠标按下才能移动

model.onmousedown = function (event) {
    let e = event || window.event
    x = e.clientX - model.offsetLeft;
    y = e.clientY - model.offsetTop;
    isDrop = true; //设为true表示可以移动
}

document.onmousemove = function(event) {
    //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
    if(isDrop) {　　　　
        let e = event || window.event                   　　
        let moveX = e.clientX - x //得到距离左边移动距离  
        let moveY = e.clientY - y //得到距离上边移动距离
        //可移动最大距离
        let maxX = document.documentElement.clientWidth - model.offsetWidth
        let maxY = document.documentElement.clientHeight - model.offsetHeight

        //范围限定
        moveX=Math.min(maxX, Math.max(0,moveX))
        moveY=Math.min(maxY, Math.max(0,moveY))

        model.style.left = moveX + "px"　　
        model.style.top = moveY + "px"　　　　　　　　　　
    } else {
        return;　　　　　　　　　　
    }

}

document.onmouseup = function() {
    isDrop = false; //设置为false不可移动
}



// clientX、clientY 点击位置距离当前body可视区域的x，y坐标
// pageX、pageY 对于整个页面来说，包括了被卷去的body部分的长度
// screenX、screenY  点击位置距离当前电脑屏幕的x，y坐标
// offsetX、offsetY  相对于带有定位的父盒子的x，y坐标