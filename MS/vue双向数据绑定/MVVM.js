




class Vue {
    constructor(options) {
        this.options = options;
        this.$el = this.options.el;
        this.$data = this.options.data;

        if (this.$el) {

            // 把所有数据 转化成object.defineProperty来定义 数据劫持
            new Observer(this.$data);
            console.log(this.$data);
            
            // 编译
            new Compiler(this.$el, this);
        }
    }
}