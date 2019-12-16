import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'

export default class VueRouter {
    constructor(options) {
        // 什么叫路由 核心是根据不同的路径跳转不同的组件
        // 将用户传递的routes 转化成好维护的结构

        // match 负责匹配路径
        // addRoutes 动态添加路由配置
        this.matcher = createMatcher(options.routes || [])

        // 创建路由系统 根据模式 来创建不同的路由对象
        this.mode = options.node || 'hash'

        // History 类 基类
        // new HshHistory
        // new H5History
        this.history = new HashHistory(this)
    }

    init(app) {
        // new Vue app 指代的都是跟实例

        // 如何初始化
        // 想呢局当前路由 显示到指定的组件
        const history = this.history

        // 哈希值监听
        const setupHashLister = () => {
            history.setupLister()
        }

        // 先拿到路径 然后再过渡到当前路径
        history.transitionTo(
            history.getCurrentLocation(), //后续要监听路径的变化
            setupHashLister //回调函数
        )

        history.listen((route)=>{
            app._route = route //视图就可以刷新了
        })
    }

    match(location) {
        return this.matcher.match(location)
    }

    push() {}

    replace() {}
}

// vue.use调用插件的 install 方法
VueRouter.install = install
