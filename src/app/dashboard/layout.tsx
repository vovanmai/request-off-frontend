'use client'
import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

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
    BarChartOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    CloudOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider theme="light" style={siderStyle}>
                <div style={{color: 'white', height: 64, borderBottom: '1px solid red'}}>4444444</div>
                <div style={menuStyle}>
                    <Menu mode="inline" theme="light" defaultSelectedKeys={['4']} items={items} />
                </div>
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: colorBgContainer
                }} />
                <Content style={{ margin: '25px 10px 0px 10px' }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <p>long content</p>
                        {
                            // indicates very long content
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

export default App;