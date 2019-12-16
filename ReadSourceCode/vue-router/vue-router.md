# vue-router

#### 1、Vue Router 的设计

![vue-router](.\vue-router.png)

hash模式兼容性比较好

2、



1、先定义

```js

export default class VueRouter {
    constructor({ routes }) {
        this.routes = routes
        this.history = new History()
        this.history.listen()
    }
}


// vue组件会调用 install 方法
VueRouter.install = function(Vue) {
    // TODO
    // router-view
    Vue.component('router-view', {
        functional: true,
        render(createElement, { props, children, parent, data }) {
            return createElement('div', {
                class: 'java-education',
            })
        },
    })
}
```

2、监听哈希的变化

```js
// 监听哈希的变化
class History {
    listen() {
        window.addEventListener('hashchange', function() {
            console.log('hash-change', window.location.hash)
        })
    }
}

// 进行调用
export default class VueRouter {
    constructor({ routes }) {
        this.routes = routes
        this.history = new History()
        this.history.listen()
    }
}
```

3、监听路由变化  然后刷新视图

