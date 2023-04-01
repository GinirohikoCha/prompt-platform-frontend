import axios from 'axios'
import { authStore } from '@/stores/auth'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 超时上线 2 分钟
  timeout: 120000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    switch (res.code) {
      case 200:
        return res
      case 401:
        const store = authStore()
        store.resetToken()
        return Promise.reject(new Error(res.message || '请求过程中发生错误'))
      default:
        return Promise.reject(new Error(res.message || '请求过程中发生错误'))
    }
  },
  error => {
    switch (error.code) {
      case 'ECONNABORTED':
        if (error.message.startsWith('timeout of')) {
          error.message = '访问超时，请稍后重试！'
        }
        return Promise.reject(error)
    }
    console.debug(error) // for debug
    return Promise.reject(error)
  }
)

export default service
