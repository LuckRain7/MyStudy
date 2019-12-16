// History 类 基类
// new HshHistory
// new H5History
export function createRoute(record, location) {
    let res = []

    //如果含有记录
    if (record) {
        // {path:/about/a,component:xxx,parent}
        while (record) {
            res.unshift(record)
            // 不停的往下找
            record = record.parent
        }
    }

    return {
        ...location,
        matched: res,
    }
}
export default class History {
    constructor(router) {
        // router => new VueRouter
        this.router = router

        // 默认路由中应该保存一个当前的路径 后续会改变这个路径
        this.current = createRoute('null', {
            path: '/',
        })
    }

    /**
     ** 跳转的核心逻辑
     *
     * @param {*} location 代表跳转的目的地
     * @param {*} onComplete 当前跳转陈宫后执行的方法
     * @memberof History
     */
    transitionTo(location, onComplete) {
        // 路由的匹配
        // 用当前的路径     找到对应的记录
        let route = this.router.match(location)
        // console.log('transitionTo-route',route);

        // 将新的route属性 覆盖掉current
        if (
            this.current.path === location &&
            route.matched.length === this.current.matched.length
        ) {
            return //如果是相同路径  就不进行跳转了
        }
        this.updateRoute(route)

        // router就是当前路由，要匹配哪些路由
        onComplete && onComplete()
    }

    updateRoute(route) {
        this.current = route
        // 执行监听的cb
        this.cb && this.cb(route)
    }

    listen(cb){
        // 先把函数存起来
        this.cb = cb;
    }
}
