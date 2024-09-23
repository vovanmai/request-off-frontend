'use client'

import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Spin, Select } from 'antd'
import Link from 'next/link'
import {
  LoginOutlined,
  EditOutlined
} from '@ant-design/icons'

import { login as requestLogin } from "../api/user/auth/index"

import { AppContext } from './../context/AppProvider'
import { useAppSelector } from '../store/hooks'
import { selectCompanies, selectEmail } from "../store/user/auth/authSlice"

export default function Login() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { showNotification } = useContext(AppContext)
  const email = useAppSelector(selectEmail)
  const companies = useAppSelector(selectCompanies).map((item: any) => {
    return {
      value: item.id,
      label: item.name
    }
  })

  useEffect(function () {
    if (!email) {
      router.push('/login/email')
    }
  }, [])

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true)
      const response = await requestLogin(values)
      localStorage.setItem('access_token', response.data.access_token)
      router.push('/dashboard');
    } catch (error) {
      showNotification.error({
        message: error.message,
      });
    }
    setIsLoading(false)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const companyId = companies[0] ? companies[0].value : null

  const initialValues = {
    email: email,
    company_id: companyId
  }
  return (
    <Form
      form={form}
      name="login-form"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      hasFeedback
      rules={[
        { required: true, message: 'Vui lòng nhập địa chỉ email.' },
        { type: 'email', message: 'Email không đúng định dạng.'},
        { max: 50, message: 'Tối đa 50 ký tự.'}
      ]}
    >
       <Input
         disabled
         size="large"
         suffix={<Link href="/login/email"><EditOutlined /></Link>}
      />
    </Form.Item>

    <Form.Item
      name="company_id"
      label="Doanh nghiệp"
      hasFeedback
      rules={[{ required: true }]
      }>
      <Select
        size="large"
        showSearch
        options={companies}
      >
      </Select>
    </Form.Item>

    <Form.Item
      label="Mật khẩu"
      name="password"
      hasFeedback
      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.'}]}
    >
      <Input.Password
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
        { isLoading ? <Spin className="spin-in-button" style={{ marginRight: 8 }} /> : <LoginOutlined />}
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
  );
}
