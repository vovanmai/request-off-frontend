'use client'
import React, { useState, ReactNode } from 'react';
import withAuth from "../../hooks/withAuth";
import {
  CloudOutlined,
  ShopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  height: '100vh',
  position: 'fixed',
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column"
};

const menuStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UploadOutlined,
  UploadOutlined,
  UploadOutlined,
  UploadOutlined,
  CloudOutlined,
  CloudOutlined,
  CloudOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const DashboardLayoutUser: React.FC = ({ children }: { children?: ReactNode }) => {
  const {
      token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [marginInlineStart, SetMarginInlineStart] = useState<number>(200);
  const toggleSider = (collapsed: boolean) => {
    setCollapsed(!collapsed)
    SetMarginInlineStart(!collapsed ? 80 : 200)
  }

  return (
    <Layout hasSider>
      <Sider theme="light" style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
        <div style={{color: 'green', display: "flex", alignItems: "center", justifyContent: "center", height: 64, borderBottom: '1px solid rgba(5, 5, 5, 0.06)', borderRight: '1px solid rgba(5, 5, 5, 0.06)'}}>
            <span style={{fontSize: 30, fontWeight: "bold"}}>XD</span>
        </div>
        <div style={menuStyle}>
          <Menu mode="inline" theme="light" defaultSelectedKeys={['4']} items={items} />
        </div>
      </Sider>
      <Layout style={{ marginInlineStart: marginInlineStart }}>
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
        <Content style={{ margin: '25px 10px 0px 10px' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
            <p>long content</p>
            {
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                    {index % 20 === 0 && index ? 'more' : '...'}
                    <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          XDCorp ©{new Date().getFullYear()} Created by Lionel Vo
        </Footer>
      </Layout>
    </Layout>
  );
};

export default withAuth(DashboardLayoutUser);