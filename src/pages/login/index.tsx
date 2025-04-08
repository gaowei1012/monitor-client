import React, { useEffect, useState } from 'react'
import { QRCode, Space, Button } from 'antd'
import Utils from '../../utils/index'
import DingCode from '../../dd/DingCode'
import './index.scss'
const DDLogin = require('../../dd/login')

export const Login = () => {
  const [text, setText] = useState('https://ant.design/')

  useEffect(() => {
    // const result = DDLogin({
    //   id:"login_container",//这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
    //   goto: "", //请参考注释里的方式
    //   style: "border:none;background-color:#FFFFFF;",
    //   width : "365",
    //   height: "400"
    // })
    console.log('result=====>>>', DDLogin)
  }, [])
  return (
    <div className='login'>
      <div className='login-qcode'>
        {/* <QRCode size={300} value={text || '-'} /> */}
        <DingCode />
      </div>
      {/* <div className='login-qtext'>钉钉扫描二维码登陆</div> */}
    </div>
  )
}
