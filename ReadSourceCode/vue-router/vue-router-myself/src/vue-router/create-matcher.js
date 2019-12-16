import createRouteMap from './create-route-map'

import { createRoute } from './history/base'

export default function createMatcher(routes) {
    // routes 用户当前传入的配置

    // 扁平化用户传入的数据 初始化 创建路由映射表
    // pathList : ["/", "/about", "/about/a", "/about/b"]
    // pathMap : {/:记录, /about:记录, /about/a:记录, /about/b:记录}
    let { pathList, pathMap } = createRouteMap(routes)

    // 动态添加的方法
    function addRoutes(routes) {
        // 动态添加的路由也需要进行处理 添加新的配置
        createRouteMap(routes, pathList, pathMap)
    }

    // 匹配的方法
    function match(location) {
        // 找到当前的数据
        let record = pathMap[location]

        let local = {
            path: location,
        }

        // 1、需要找到对应的记录 并且根据记录差生一个匹配数组
        if (record) {
            // 找到记录
            return createRoute(record, local)
        }
        return createRoute(null, local)
    }

    return {
        match,
        addRoutes,
    }
}
