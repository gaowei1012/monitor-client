// @ts-nocheck

import React from 'react'
import { message } from 'antd'
import './index.scss'

export default class DingCode extends React.Component {
  constructor(props: {}) {
    super(props)
    this.state = {
      // 你们申请的appid
      APPID: '5000000004699849',
      // 跳转当前页面
      REDIRECT_URI: encodeURIComponent('https://3741-221-12-170-114.ngrok-free.app:3000/') //http://XXX/#/login 你的登录页面
    }
  }
  componentDidMount(): void {
    console.log('componentDidMount', this, this.state)
    let URL = encodeURIComponent(
      `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.state.APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${this.state.REDIRECT_URI}`
    )
    // 实例化对象
    var obj = window.DDLogin({
      id: 'login_container',
      goto: URL,
      style: 'border:none;background-color:#FFFFFF;',
      width: '100%',
      height: '400'
    })
    // 监听消息处理方法
    const handleMessage = (event) => {
      // 获取loginTempCode
      const loginTempCode = event.data
      // 获取消息来源
      const origin = event.origin
      // 拼接 url
      const url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.state.APPID}&response_type=code&scope=snsapi_login&state=dinglogin&redirect_uri=${this.state.REDIRECT_URI}&loginTmpCode=${loginTempCode}`
      // 如果来源为https://login.dingtalk.com，则在当前窗口打开回调链接
      if (origin === 'https://login.dingtalk.com') {
        window.open(encodeURI(url), '_parent')
      }
    }
    // 监听iframe的消息
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', handleMessage, false)
    } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('onmessage', handleMessage)
    }

    //params为地址栏路由后面的参数（我这里是从 父组件中传过来的）
    const { params } = this.props
    //手机钉钉扫码后 确认登录 成功后 网页地址栏会出现一个参数：state='dinglogin'
    if (params && params.state === 'dinglogin') {
      //同时出现参数code （因为我们需要拿到这个参数 传给后台来获取用户信息）判断后再进行下一步操作
      if (params.code || params['?code']) {
        let code = params.code ? params.code : params['?code']
        let parameter = { jsCode: code, externalType: 2 }
        console.log('response=====>>>', params)
        //在这里调用接口 获取用户信息，拿到返回结果，判断是否需要调用自己的登录接口
        // request.getExternalOpenId（parameter，data=>{
        // 	if (data.data.status === 200) {
        //        if(data.data.data.isRegist===true){
        //        		//手机号关联过系统中注册的账号 就进行下一步
        //            login(data.data.data.openId);
        //        }else{
        //        	//弹出提示 并且保持登录页 注册账号
        //          message.warning('请先到个人中心关联手机号');
        //          this.props.history.push('/login')
        //         }
        //     } else {
        //        message.error(data.data.message)
        //     }
        // })
      }
    }
    const login = (openId) => {
      let params = {
        openId: openId,
        ...other_params //其他后台需要的参数
      }
      request.loginExternal(params, (response) => {
        if (response.data.status === 200) {
          //跳转你要去的系统页面
          this.props.history.push('/index')
        } else {
          message.error(response.data.message)
        }
      })
    }
  }

  render(): React.ReactNode {
    return <div id='login_container' className='qCodeWrap'></div>
  }
}
