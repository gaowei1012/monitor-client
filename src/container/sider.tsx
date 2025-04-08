/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 15:21:02
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 17:22:35
 * @FilePath: /management-terminal/src/container/sider.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Utils from "../utils/index";
import { IconFont } from "../utils/iconfontCN";

const { Sider } = Layout;

type ICustomerSider = {
  collapsed: boolean;
};

export const CustomerSider: React.FC<ICustomerSider> = ({ collapsed }) => {
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string>("");

  useEffect(() => {
    const result = Utils.getStorage("defaultSelectedKeys");
    if (result) {
      setDefaultSelectedKeys(result);
    } else {
      setDefaultSelectedKeys("/database/index");
    }
  }, []);

  const itmes = [
    {
      key: "/database",
      // icon: <DatabaseOutlined />,
      icon: <IconFont size={48} type="icon-data" />,
      label: "学校运动数据",
      children: [
        {
          key: "/database/index",
          label: "月数据",
          icon: <IconFont type="icon-data1" size={48} />,
        },
        {
          key: "/database/detail",
          label: "明细",
          icon: <IconFont type="icon-filepocket" size={48} />,
        },
      ],
    },
    {
      key: "/income",
      icon: <IconFont size={48} type="icon-shourumingxi" />,
      label: "收入明细",
      children: [
        {
          key: "/income/index",
          label: "月账单",
          icon: <IconFont type="icon-l-benyuezhangdan" size={48} />,
        },
        {
          key: "/income/detail",
          label: "明细",
          icon: <IconFont type="icon-filepocket" size={48} />,
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const onCollapse = (event: any) => {
    setDefaultSelectedKeys(event.key);
    navigate(event.key);
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      <div className="customer-sider-vertical">
        {collapsed ? "" : "AI体育合作伙伴数据看板"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={onCollapse}
        selectedKeys={[defaultSelectedKeys]}
        // defaultSelectedKeys={[defaultSelectedKeys]}
        // onChange={(event) => {
        //   console.log("=====>>>", event);
        // }}
        items={itmes}
      />
    </Sider>
  );
};
