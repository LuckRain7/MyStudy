
class Compiler {
    constructor(el, vm) {
        this.vm = vm;
        // 判断el属性 是不是一个元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        // 把节点中的元素 放到内存中 统一替换完再渲染
        let fragment = this.node2fragment(this.el);

        // 编译模板
        this.compile(fragment);

        // 渲染新内容
        this.el.appendChild(fragment);

    }

    isDirective(attrName) {// 判断是否为指令
        return attrName.startsWith('v-');
    }

    compileElement(node) {// 编译节点
        let attributes = node.attributes;//拿到属性 {0: type, 1: v-model, type: type, v-model: v-model, length: 2}
        [...attributes].forEach(attr => {
            let { name, value: expr } = attr;//v-model="message.name"
            // 判断是否带有v-指令
            if (this.isDirective(name)) { //v-model
                let [, directive] = name.split('-');
                CompileUtil[directive](node, expr, this.vm);//需要不同的指令进行处理

            }
        })

    }

    compileText(node) {// 编译文本
        let content = node.textContent;
        // 用正则进行匹配
        if (/\{\{(.+?)\}\}/.test(content)) {
            CompileUtil['text'](node, content, this.vm);
        }
    }

    // 编译内存中的DOM节点
    compile(node) {
        let childNodes = node.childNodes;
        [...childNodes].forEach(child => {
            // 节点和文本需要分开处理
            if (this.isElementNode(child)) {//节点 判断v-model
                this.compileElement(child);
                // 还要判断元素中的本文问题<div>{{ message }}</div>
                this.compile(child);
            } else {//文本  判断{{ message }}
                this.compileText(child);
            }
        })

    }

    // 把节点移动到内存中
    node2fragment(node) {
        let fragment = document.createDocumentFragment();//创建一个文档碎片

        // 之所以可以这样写是因为 appendChild 具有移动性
        let firstChild;
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild);
        }

        return fragment;
    }

    // 判断元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
}

// 处理指令
const CompileUtil = {
    /**
     * 通过表达式在实例中取到对应的数据
     * @param {*} vm vue实例
     * @param {*} expr  表达式 message.name
     */
    getVal(vm, expr) {
        // 递归取值
        return expr.split('.').reduce((data, current) => {
            return data[current];
        }, vm.$data)
    },
    setVal(vm, expr, value) {
        return expr.split('.').reduce((data, current, index, arr) => {
            // 判断最后一项 进行赋值
            if (  index == arr.length - 1) {
                return data[current] = value;
            }
            return data[current];
        }, vm.$data)
    },
    /**
     * 处理 v-model 指令
     * @param {*} node 节点 DOM节点
     * @param {*} expr 表达式  message.name
     * @param {*} vm 当前实例 Vue实例 其中包含data数据
     */
    model(node, expr, vm) {
        let fn = this.updater['modelUpdater'];

        // 添加观察者
        // 给输入框添加一个观察着 如果稍后数据更新了会触发此方法，会拿新值给输入框赋值
        new Watcher(vm, expr, (newVal) => {
            fn(node, newVal);
        });
        node.addEventListener('input', (e) => {
            let newValue = e.target.value; // 获取用户输入的内容
            this.setVal(vm, expr, newValue);//更新方法
        });
        let value = this.getVal(vm, expr); // 拿到的是 zzy
        fn(node, value);
    },
    html() {

    },
    getContentValue(vm, expr) {
        // 遍历表达式  将内容 重新替换成一个完整的内容 返回回去
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1]);
        })
    },
    text(node, expr, vm) {
        let fn = this.updater['textUpdater'];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // 给表达式每个{{}} 添加观察者
            new Watcher(vm, args[1], (newVal) => {
                // 不能把全部的替换了 只替换其中的部分
                let allContent = this.getContentValue(vm, expr);//返回一个全的字符串
                fn(node, allContent);
            });
            // args是 前面匹配返回的结果  args[1]=> message.name
            return this.getVal(vm, args[1]);
        });
        fn(node, content);
    },
    updater: {
        /**
         * 把数据插入到节点中
         * @param {*} node 节点 
         * @param {*} value 数据值
         */
        modelUpdater(node, value) {
            node.value = value;
        },
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater() {

        }
    }
}
