// 将用户传入的数据进行格式化

export default function createRouteMap(routes, oldPathList, oldPathMap) {
    let pathList = oldPathList || []
    let pathMap = oldPathMap || Object.create(null)

    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap)
    })

    console.log('pathList', pathList)
    console.log('pathMap', pathMap)

    return {
        pathList,
        pathMap,
    }
}

//

/**
 * 添加路由记录
 * 到映射表里边去
 * @param {*} route 路由
 * @param {*} pathList 路由列表
 * @param {*} pathMap 路由映射表
 * @param {*} parent 为了将子路由补全，拿父路由的路径
 */
function addRouteRecord(route, pathList, pathMap, parent) {
    let path = parent ? `${parent.path}/${route.path}` : route.path

    // 记录的格式
    let record = {
        path,
        component: route.component,
        parent,
    }

    // 先进行判断，防止路由重名
    if (!pathMap[path]) {
        pathList.push(path) //将路径添加到 pathList 中
        pathMap[path] = record  //建立映射表
    }

    // 循环儿子里边的路由
    if (route.children) {
        route.children.forEach(child => {
            // 每次循环儿子时，都将父路径传入
            addRouteRecord(child, pathList, pathMap, record)
        })
    }
}
