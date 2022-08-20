import store from "@/store";
import axios from "axios";
import * as Types from '@/store/action-types'
class HttpRequest {
    constructor() {
        this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:7001';
        this.timeout = 3000
        this.queue = {}
    }
    setInterceptor(instance, url) {
        instance.interceptors.request.use((config) => {
            if (Object.keys(this.queue).length === 0) {
                // open loading
            }
            let token = localStorage.getItem("token")
            if (token) {
                config.headers.authorization = token;//添加请求头
            }
            let CancelToken = axios.CancelToken
            config.cancelToken = new CancelToken((c) => {
                store.commit(Types.SET_TOKEN, c)//同步将取消方法存到vuex
            })
            this.queue[url] = true//请求进入请求对列
            return config
        })
        instance.interceptors.response.use((res) => {
            delete this.queue[url]
            if (Object.keys(this.queue).length === 0) {
                // close loading
            }
            if (res.data.err == 0) {
                return res.data.data;
            } else {
                return Promise.reject(err.data)
            }
        }, (err) => {
            delete this.queue[url]
            if (Object.keys(this.queue).length === 0) {
                // close loading
            }
            return Promise.reject(err)
        })
    }
    request(options) {
        const instance = axios.create()
        let config = {
            baseURL: this.baseURL,
            timeout: this.timeout,
            ...options
        }
        this.setInterceptor(instance, config.url)
        return instance(config)
    }
    get(url, data = {}) {
        return this.request({
            url,
            method: 'get',
            ...data
        })
    }
    post(url, data = {}) {
        return this.request({
            url,
            method: 'post',
            data
        })
    }
}

export default new HttpRequest