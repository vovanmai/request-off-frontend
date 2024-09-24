'use client'
import { MenuProps, Layout, Menu} from "antd";
const { Sider } = Layout;
import React, { CSSProperties } from "react";
import { useRouter } from "next/navigation";
type MenuItem = Required<MenuProps>['items'][number];

const LayoutSider = ({collapsed, menus}: {collapsed: boolean, menus: MenuItem[]}) => {
  const router = useRouter()
  const siderStyle: CSSProperties = {
    height: '100vh',
    position: 'fixed',
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column"
  };

  const menuStyle: CSSProperties = {
    flex: 1,
    overflowY: "auto",
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
  };

  const selectMenu = (menuInfo) => {
    const routes = {
      'users': '/dashboard/users',
      'roles': '/dashboard/roles',
    }

    const route = routes[menuInfo.key]

    if (route) {
      router.push(route)
    }
  }

  return (
    <Sider theme="light" style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
      <div style={{color: 'green', display: "flex", alignItems: "center", justifyContent: "center", height: 64, borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderRight: '1px solid rgba(5, 5, 5, 0.06)'}}>
        <span style={{fontSize: 30, fontWeight: "bold"}}>XD</span>
      </div>
      <div style={menuStyle}>
        <Menu
          mode="inline"
          theme="light"
          defaultSelectedKeys={['']}
          items={menus}
          onClick={(menuInfo) => {selectMenu(menuInfo)}}
        />
      </div>
    </Sider>
  )
}

export default LayoutSider