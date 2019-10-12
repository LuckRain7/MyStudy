
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

        // obj 要在其上定义属性的对象。
        // prop 要定义或修改的属性的名称。
        // descriptor 将被定义或修改的属性描述符。
        // Object.defineProperty(obj, prop, descriptor)
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set: (newValue) => {
                if (value != newValue) {
                    this.observer(newValue);
                    value = newValue;
                }
            }
        });
    }
}