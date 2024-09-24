'use client'
import React, { useState, ReactNode } from 'react';
import withAuth from "@/hooks/withAuth";
import type { MenuProps } from 'antd';
import { Layout, theme } from 'antd';
import LayoutHeader from '@/components/layout/Header'
import LayoutSider from '@/components/layout/Sider'
import LayoutFooter from '@/components/layout/Footer'
type MenuItem = Required<MenuProps>['items'][number];


const { Content } = Layout;

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

  const menuItems: MenuItem[] = [
    {
      key: 'roles',
      label: 'Quyền',
    },
    {
      key: 'users',
      label: 'Người dùng',
    },
  ];

  return (
    <Layout hasSider>
      <LayoutSider
        collapsed={collapsed}
        menus={menuItems}
      />
      <Layout style={{ marginInlineStart: marginInlineStart }}>
        <LayoutHeader
          collapsed={collapsed}
          toggleSider={toggleSider}
        />
        <Content style={{ margin: '25px 12px 0px 12px' }}>
          {children}
        </Content>
        <LayoutFooter/>
      </Layout>
    </Layout>
  );
};

export default withAuth(DashboardLayoutUser);