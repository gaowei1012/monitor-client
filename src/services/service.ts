/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-03-31 16:32:54
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-03-31 16:33:04
 * @FilePath: /data-management-terminal/src/services/service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { Method } from 'axios'
import { baseURL } from './config'
import { message } from 'antd'

axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    message.error(`${err}`)
  }
)

export const doRequest = (options: { method: Method; url: string; data?: any }) => {
  const { method, url, data } = options
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      baseURL: baseURL,
      url,
      data: data ? data : null,
      headers: {
        'content-type': 'application/json',
        // 'access-control-allow-origin': '*'
      },
      withCredentials: true,
      // changeOrigin: true,
      timeout: 18000
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
