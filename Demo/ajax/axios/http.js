import axios from 'axios'
// A querystring parsing and stringifying library with some added security.
import qs from 'qs'


/*
 * 根据环境切换变量
 */
switch (process.env.NODE_ENV) {
    case "production":
        axios.defaults.baseURL = 'http://shangxiandizhi.com'
    case "test":
        axios.defaults.baseURL = 'http://192.168.20.12:8080'
    default:
        axios.defaults.baseURL = 'http://localhost:3000'
}

/*
 * 设置超时时间
 */
axios.defaults.timeout = 10000

/*
 * 设置跨域是否允许携带资源凭证
 */
axios.defaults.withCredentials = true

/*
 * 设置请求传递数据的格式  并设置Request数据加密
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-from-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)



/*
 * 设置请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * TOKEN效验（JWT）接收服务器返回的token 存储到Vuex/本地存储 
 *                每一次向服务器发送请求，我们应该把token带上
 */
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config;
}, function (error) {
    return Promise.reject(error);
});

/*
 * 设置响应拦截器
 * 服务器返回信息 -> [拦截的统一处理] -> 客户端JS获取到信息
 */

/* axios.defaults.validateStatus = status =>{
    自定义响应成功的HTTP状态码
    return /^(2|3)\d{2}$/.test(status)
} */
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    let { response } = error
    if (response) {
        // 服务器返回结果了
        switch (response.status) {
            case 401: //当前请求需要用户验证（一般是未登录）
                break
            case 403: // 服务器已经理解请求 但是拒绝执行它（一般是TOKEN过期）
                localStorage.removeItem('token')
                break
            case 404: // 请求失败 请求所希望得到的资源没有在服务器上发现
                break
        }
        return Promise.reject(error)
    } else {
        // 服务器连结果都没有返回
        if (!window.navigator.onLine) {
            // 断网处理：可以跳转到断网页面
            return
        }
        return Promise.reject(error)
    }
});

export default axios