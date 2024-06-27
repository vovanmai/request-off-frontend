'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

const inter = Inter({ subsets: ["latin"] });

import AppProvider from './../context/AppProvider'

const theme = {
  token: {
    // Seed Token
    colorPrimary: '#00b96b',
    // borderRadius: 2,

    // Alias Token
    // colorBgContainer: '#f6ffed',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AntdRegistry>
          <ConfigProvider
            theme={theme}
          >
            <AppProvider>
              {children}
            </AppProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>

    </html>
  );
}
