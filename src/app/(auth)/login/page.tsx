import { Card } from 'antd';
import LoginComponent from '@/components/Login';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login pape",
};


export default function Login() {
  const title = <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>

  return (
    <Card title={title} bordered={false} style={{ width: 500, margin: 'auto', marginTop: 200 }}>
      <LoginComponent/>
    </Card>
  );
}
