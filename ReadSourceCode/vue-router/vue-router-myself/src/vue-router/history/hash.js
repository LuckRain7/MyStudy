import History from './base'

// 这个是不考虑兼容问题 ie 火狐 不适用
function getHash() {
    return window.location.hash.slice(1)
}

function ensureSlash() {
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}
export default class HashHistory extends History {
    constructor(router) {
        super(router)

        // 确保首次有 #/
        ensureSlash()
    }
    // 拿到当前路由
    getCurrentLocation() {
        return getHash()
    }

    setupLister() {
        window.addEventListener('hashchange', () => {
            // 哈希变了 要重新进行跳转
            this.transitionTo(getHash())
        })
    }
}
