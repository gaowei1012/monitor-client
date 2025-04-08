/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
  ProFormCheckbox
} from "@ant-design/pro-components";
import { Tabs, message, theme } from "antd";
import { postLogin } from "../../apis/index";
import { setLoginState } from "../../hooks/index";
import Utils from "../../utils/index";
import { useState } from "react";

type LoginType = "phone" | "account";

export const InputLogin = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("account");
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (value: any) => {
   
    const result = (await postLogin(value)) as {
      statusCode: number;
      data: any;
      message: string;
    };
    if (result.statusCode === 200) {
      Utils.setStorage("auth", JSON.stringify(result.data));
      window.location.replace('/database/index')
      setLoginState(true);
    } else {
      messageApi.open({
        type: 'error',
        content: `${result.message}`
      })
    }
  };

  return (
    <ProConfigProvider dark={false}>
      {contextHolder}
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <LoginFormPage
          backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
          // logo="https://ldl-individual.oss-cn-hangzhou.aliyuncs.com/assOfficial/svg.png"
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="数据统计工具"
          containerStyle={{
            backgroundColor: "rgba(255, 255, 255,1)",
            backdropFilter: "blur(4px)",
          }}
          onFinish={onFinish}
          // subTitle='全球最大的代码托管平台'
          //   activityConfig={{
          //     style: {
          //       boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
          //       color: token.colorTextHeading,
          //       borderRadius: 8,
          //       backgroundColor: 'rgba(255,255,255,0.25)',
          //       backdropFilter: 'blur(4px)'
          //     },
          //     title: '活动标题，可配置图片',
          //     subTitle: '活动介绍说明文字',
          //     action: (
          //       <Button
          //         size='large'
          //         style={{
          //           borderRadius: 20,
          //           background: token.colorBgElevated,
          //           color: token.colorPrimary,
          //           width: 120
          //         }}>
          //         去看看
          //       </Button>
          //     )
          //   }}
          actions={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
            </div>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
            {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
          </Tabs>
          {loginType === "account" && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                placeholder='请输入用户名：root'
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={"prefixIcon"}
                    />
                  ),
                }}
                placeholder='请输入密码：123456'
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              opacity: 0
            }}
          >
            <ProFormCheckbox onMetaChange={(value) => {
              console.log('记住账号密码', value)
            }} noStyle name="autoLogin">
              记账账号密码
            </ProFormCheckbox>
          </div>
        </LoginFormPage>
      </div>
    </ProConfigProvider>
  );
};
