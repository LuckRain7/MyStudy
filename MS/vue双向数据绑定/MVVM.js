class Vue {
    constructor(options) {
        this.options = options;
        this.$el = this.options.el;
        this.$data = this.options.data;

        if (this.$el) {

            // 把所有数据 转化成object.defineProperty来定义 数据劫持
            new Observer(this.$data);

            // 把数据获取操作 VM上的取值操作 都代理到 VM.$data
            this.proxyVm(this.$data);

            // 编译
            new Compiler(this.$el, this);
        }
    }

    proxyVm(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key] //进行了转化操作
                },
            })
        }
    }
}