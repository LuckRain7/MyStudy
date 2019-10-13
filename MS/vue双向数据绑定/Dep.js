
/**
 *
 * 
 * @class Dep
 */
class Dep {
    constructor() {
        this.subs = []; //存放所有的watcher

    }

    //添加 watcher  订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }

    // 通知
    notify() {   
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }
}