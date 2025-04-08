/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 15:21:02
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 16:23:03
 * @FilePath: /management-terminal/src/container/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useState } from 'react'
import { Layout, theme } from 'antd'
import { CustomerSider } from './sider'
import { CustomerHeader } from './header'
import { Router } from '../routes/minRoutes'
import { setLoginState } from '../hooks/index'
import Utils from '../utils'
import './layout.scss'

const { Content } = Layout

export const Container = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const onExitLogin = () => {
    Utils.deleteStorage('auth')
    Utils.deleteStorage('defaultSelectedKeys')
    window.location.replace('/login')
    setLoginState(false)
  }
  return (
    <Layout style={{ height: '100vh' }} hasSider>
      <CustomerSider collapsed={collapsed} />
      <Layout>
        <CustomerHeader
          onExitLogin={onExitLogin}
          collapsed={collapsed}
          onCollapsed={() => {
            setCollapsed(!collapsed)
          }}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: '12px 12px',
            padding: 16,
            background: colorBgContainer,
            overflow: 'initial'
          }}>
          <Router />
        </Content>
      </Layout>
    </Layout>
  )
}
