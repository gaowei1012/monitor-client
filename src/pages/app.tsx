/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-03-31 16:33:29
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 11:03:12
 * @FilePath: /data-management-terminal/src/pages/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BrowserRouter } from 'react-router-dom'
import { useLoginState } from '../hooks/index'
import { Container } from '../container/index'
import { Router } from '../routes/routes'
import Utils from '../utils/index'
import { ConfigProvider } from 'antd'
import locale from "antd/locale/zh_CN";
import './app.scss'
// import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';


export const App = () => {
  const { isLogin } = useLoginState()

  dayjs.locale('zh-cn');

  
  const requestAuth = () => {
    const result = Utils.getStorage('auth')
    console.log('requestAuth=====>>>', result)
    if (isLogin || result) {
      return (
        <BrowserRouter>
          <ConfigProvider locale={locale}>
            <Container />
          </ConfigProvider>
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      )
    }
  }

  return requestAuth()
}
