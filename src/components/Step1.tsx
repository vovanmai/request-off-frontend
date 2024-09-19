'use client'

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import type { FormProps } from 'antd';
import { Button, Form, Input, Spin } from 'antd';
import {
  LoadingOutlined,
  LoginOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { AppContext } from './../context/AppProvider'


type FieldType = {
  code?: string;
  email?: string;
  password?: string;
};

export default function Login() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { showNotification } = useContext(AppContext)


  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true)
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values)
    // })
    // const content = await response.json()
    // if (response.ok) {
    //   showNotification?.success({
    //     message: content.message,
    //   });
    //   router.push('/dashboard');
    // } else {
    //   if (response.status === 401) {
    //     showNotification.error({
    //       message: content.message,
    //     });
    //   }
    // }
    // setIsLoading(false)
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);

  };
  
  return (
    <Form
      form={form}
      name="login-form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Email"
      name="email"
      hasFeedback
      rules={[
        { required: true, message: 'Vui lòng nhập.'},
        { type: 'email', message: 'Email không đúng định dạng.'},
      ]}
    >
       <Input
        size="large"
      />
    </Form.Item>

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        shape="round"
        block
      >
        { isLoading ? <Spin className="loading" indicator={<LoadingOutlined spin />} /> : <LoginOutlined />}
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
  );
}
