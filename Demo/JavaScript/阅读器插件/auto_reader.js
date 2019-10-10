; (function (win) {

    let playing = false,
        t = null,
        wHeight = getViewportSize().height, //可视区域的高度
        sHeight = getScrollSize().height; //文档的高度（包含滚动条的区域）

    var AutoReader = function (options) {
        this.topBtn = options.topBtn;
        this.playBtn = options.playBtn;
        console.log(this);
    }

    AutoReader.prototype = {
        init() {
            this.bindEvent();
        },
        bindEvent() {
            addEvent(win, 'scroll', this.topBtnShow.bind(this));
            addEvent(this.topBtn, 'click', this.moveToTop.bind(this));

            addEvent(this.playBtn, 'click', this.setAutoPlay.bind(this, this.playBtn));
        },
        topBtnShow() {
            let sTop = getScrollOffset().top;
            topBtn = this.topBtn;
            this.topBtn.style.display = sTop ? 'block' : 'none';
        },
        moveToTop() {
            win.scrollTo(0, 0);
        },
        setAutoPlay(playBtn) {
            let sTop = getScrollOffset().top;
            // playBtn bind传入的第二个值

            if (sTop + wHeight - 43 === sHeight) {
                console.log('触底了');
                return;
            }

            if (!playing) {
                t = setInterval(() => {
                    sTop = getScrollOffset().top;

                    // ! 莫名多了 43 像素  待解决
                    if (sTop + wHeight - 43 === sHeight) {
                        clearInterval(t);
                        playing = false;
                        playBtn.innerText = '播放';//可以进行图标的替换
                    } else {
                        win.scrollBy(0, 1);
                    }
                }, 10);
                playBtn.innerText = '暂停';
                playing = true;

            } else {

                clearInterval(t);
                playing = false;
                playBtn.innerText = '播放';
            }


        }
    }

    win.AutoReader = AutoReader;
})(window);