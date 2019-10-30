const getBtn = document.getElementById('get-btn')
const postBtn = document.getElementById('post-btn')

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest() //创建一个xhr对象

        xhr.open(method, url) //为发送一个http请求做准备

        xhr.responseType = 'json' //设置返回值类型

        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = function () { //获得响应  函数就会被触发
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject('error')
        }

        xhr.send(JSON.stringify(data));//发送
    })
    return promise
}



const BASE_URL = 'https://reqres.in'

const getData = () => {
    sendHttpRequest('GET', BASE_URL + '/api/users?page=2').then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

const postData = () => {
    sendHttpRequest('POST', BASE_URL + '/api/register', {
        "email": "eve.holt@reqres.in"
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)