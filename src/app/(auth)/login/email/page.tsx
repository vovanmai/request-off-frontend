import { Card } from 'antd';
import Step1 from '@/components/Step1';

export const metadata = {
    title: 'Đăng nhập',
    description: 'Chào mừng bạn đến với ứng dụng.',
};

export default function Login() {
  const title = <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
  return (
      <Card title={title} bordered={false} className="auth-page" style={{ margin: 'auto', marginTop: 100 }}>
          <Step1/>
      </Card>
  );
}
