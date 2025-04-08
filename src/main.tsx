/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 15:18:10
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-08 11:14:43
 * @FilePath: /management-terminal/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './pages/app'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
