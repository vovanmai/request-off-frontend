'use client'
import {Button, Spin, theme, Layout} from "antd";
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import React from "react";

const LayoutHeader = ({collapsed, toggleSider}: {collapsed: boolean, toggleSider: Function}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: colorBgContainer,
      borderBottom: '1px solid rgba(5, 5, 5, 0.06)'
    }}>
      <div>
        <div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => toggleSider(collapsed)}
            style={{
              fontSize: '16px',
              width: 35,
              height: 35,
            }}
          />
        </div>
      </div>
    </Header>
  )
}

export default LayoutHeader