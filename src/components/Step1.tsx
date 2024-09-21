'use client'

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import type { FormProps } from 'antd';
import { Button, Form, Input, Spin } from 'antd';
import {
  LoadingOutlined,
  LoginOutlined,
} from '@ant-design/icons';

import { AppContext } from './../context/AppProvider'
import { getCompanies } from '../api/auth'

import { useAppDispatch } from '../store/hooks'
import { setCompanies, setEmail } from '../store/user/auth/authSlice'


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
  const dispatch = useAppDispatch()


  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true)
    try {
      const response = await getCompanies(values)
      if (response.data.length > 0) {
        dispatch(setCompanies(response.data))
        dispatch(setEmail(values.email))
        router.push('/login')
      } else {
        showNotification.error({
          message: 'Email không tồn tại.'
        })
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (errorInfo) => {
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
        disabled={isLoading}
      >
        { isLoading ? <Spin className="loading" indicator={<LoadingOutlined spin />} /> : <LoginOutlined />}
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
  );
}
