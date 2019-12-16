// 函数式组件 没有this 没有状态

export default {
    functional: true,
    render(h, { parent, data }) {
    
        // matched 依次去渲染
        let route = parent.$route
        let matched = route.matched
        data.routerView = true //当前组件是一个 routerView
        let depth = 0

        // 循环爸爸 找上面的router-view
        while (parent) {
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++
            }
            parent = parent.$parent
        }

        let record = matched[depth]
        if (!record) {
            return h() //渲染一个空页面
        }
        let component = record.component
        return h(component, data)
    },
}
