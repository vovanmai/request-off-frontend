'use client'
import { Button, theme, Layout } from "antd";
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import React from "react";
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from "@/store/user/auth/authSlice";

const LayoutHeader = ({collapsed, toggleSider}: {collapsed: boolean, toggleSider: Function}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const currentUser = useAppSelector(selectCurrentUser)
  return (
    <Header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
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
          {currentUser?.name}
        </div>
      </div>
    </Header>
  )
}

export default LayoutHeader