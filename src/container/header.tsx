/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 15:21:02
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 14:40:49
 * @FilePath: /management-terminal/src/container/header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import Utils from "../utils/index";
import "./layout.scss";

const { Header } = Layout;

type ICustomerHeader = {
  collapsed: boolean;
  onCollapsed: () => void;
  colorBgContainer: string;
  onExitLogin: () => void;
};

export const CustomerHeader: React.FC<ICustomerHeader> = ({
  collapsed,
  onCollapsed,
  colorBgContainer,
  onExitLogin,
}) => {
  const renderHederRightNode = () => {
    const result = Utils.getStorage("auth");
    if (result) {
      return (
        <div className="headerFlexRow-rightBox">
          <span>
            {JSON.parse(result)["corpName"]
              ? JSON.parse(result)["corpName"]
              : ""}
          </span>
          <Button
            className="headerFlexRow-rightBox-btn"
            size="small"
            onClick={() => onExitLogin && onExitLogin()}
          >
            退出登录
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Header
      className="headerFlexRow"
      style={{
        padding: 0,
        background: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => onCollapsed && onCollapsed()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      {renderHederRightNode()}
    </Header>
  );
};
