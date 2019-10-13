/**
 *
 * 观察着（包含 发布订阅）
 * @class Watcher
 */
class Watcher {
    /**
     *Creates an instance of Watcher.
     * @param {*} vm
     * @param {*} expr 表达式
     * @param {*} cb 回调函数
     * @memberof Watcher
     */
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;  //传进来的callback是更新数据的方法

        // 默认先存放一个老值
        this.oldValue = this.get();
    }

    get() {    
        Dep.target = this; //先把自己放到this上
        
        // 取值  把观察者和数据关联起来
        let value = CompileUtil.getVal(this.vm, this.expr);
        Dep.target = null;
        return value;
    }

    // 更新操作 数据变化后 会调用观察着的update方法
    update() {
        let newVal = CompileUtil.getVal(this.vm, this.expr);
        if (newVal !== this.oldValue) {
            this.cb(newVal);
        }
    }
}