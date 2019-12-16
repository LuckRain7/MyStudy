// 单独 install 文件

import RouterView from './components/view'

// 安装插件、这个插件依赖于vue
export let _Vue
export default function install(Vue) {
    console.log('install')

    // Vue就是vue的构造函数
    _Vue = Vue

    

    // 混入
    // 在所有足组件上都加上了 _routerRoot 属性
    Vue.mixin({
        beforeCreate() {
            // 这里会走两次 一次走的main.js 第二次app.vue
            // console.log(this.$options.name)

            // 深度优先,给每个组件挂在实例
            if (this.$options.router) {
                //说明这里边是根实例
                this._routerRoot = this
                this._router = this.$options.router

                // init()在this上  所以写在 class VueRouter上面
                this._router.init(this) //初始化方法

                // 响应式数据变化 只要_route 变化 就会更新视图
                Vue.util.defineReactive(
                    this,
                    '_route',
                    this._router.history.current
                )
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        },
    })

    // 1、注册全局属性 ￥router $route
    // 2、注册全局指令 v-scroll ...
    // 3、注册全局的组件 router-view router-link
    
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        },
    })

    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router //拿到 router 属性
        },
    })

    Vue.component('RouterView',RouterView)
}
