
/**
 * 实现数据劫持
 * @class Observer
 */
class Observer {
    constructor(data) {
        this.observer(data)
    }

    observer(data) {
        if (data && typeof data === 'object') {
            // 如果是对象
            for (let key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }

    defineReactive(obj, key, value) {

        this.observer(value);//递归进行
        let dep = new Dep();//给每一个属性，都加上一个具有发布订阅的功能

        // obj 要在其上定义属性的对象。
        // prop 要定义或修改的属性的名称。
        // descriptor 将被定义或修改的属性描述符。
        // Object.defineProperty(obj, prop, descriptor)
        Object.defineProperty(obj, key, {
            get() {
                // 创建watcher 时 会取到对应的内容，并且把watcher放到全局上
                Dep.target && dep.addSub(Dep.target);
                // console.log(dep);
                return value;
            },
            set: (newValue) => {
                console.log('set');
                
                if (value != newValue) {
                    this.observer(newValue);
                    value = newValue;
                    dep.notify();
                }
            }
        });
    }
}