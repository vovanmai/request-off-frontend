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
import LayoutHeader from '@/components/layout/Header'
import LayoutSider from '@/components/layout/Sider'

const { Content, Footer } = Layout;

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
      <LayoutSider
        collapsed={collapsed}
        menus={items}
      />
      <Layout style={{ marginInlineStart: marginInlineStart }}>
        <LayoutHeader
          collapsed={collapsed}
          toggleSider={toggleSider}
        />
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