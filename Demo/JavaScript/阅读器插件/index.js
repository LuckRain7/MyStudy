var topButton = document.getElementById('top');


// 设置回到顶部按钮的显示和隐藏
addEvent(window, 'scroll', function () {
    let sTop = getScrollOffset().top;

    sTop ? topButton.style.display = 'block' : topButton.style.display = 'none';
});

// 点击回到顶部
addEvent(topButton, 'click', function () {
    window.scrollTo(0, 0);
})





