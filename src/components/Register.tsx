'use client'

import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Divider } from 'antd';
const { TextArea } = Input;
import {
  LoginOutlined,
} from '@ant-design/icons';

type FieldType = {
  name?: string;
  code?: string;
  email?: string;
  password?: string;
  address?: string;
};


export default function Login() {
  // const [form] = Form.useForm();
  // const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  //   console.log('Success:', values);
  // };
  //
  // useEffect(() => {
  //   form.getFieldsError()
  // }, [])
  //
  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  //
  // };
  
  return (
      <div>dsfhj</div>
  //   <Form
  //     form={form}
  //     name="login-form"
  //     labelCol={{ span: 5 }}
  //     wrapperCol={{ span: 19 }}
  //     initialValues={{ }}
  //     onFinish={onFinish}
  //     onFinishFailed={onFinishFailed}
  //     autoComplete="off"
  // >
  //   <h3>Thông tin công ty</h3>
  //   <Divider style={{ marginTop: 10 }} />
  //   <Form.Item<FieldType>
  //     label="Mã công ty"
  //     name="code"
  //     hasFeedback
  //     rules={[
  //       { required: true, message: 'Vui lòng nhập.' },
  //       { max: 20, message: 'Tối đa 20 ký tự.'}
  //     ]}
  //   >
  //     <Input
  //       size="large"
  //     />
  //   </Form.Item>
  //
  //   <Form.Item<FieldType>
  //     label="Tên công ty"
  //     name="name"
  //     hasFeedback
  //     rules={[
  //       { required: true, message: 'Vui lòng nhập.' },
  //       { max: 255, message: 'Tối đa 255 ký tự.'}
  //     ]}
  //   >
  //      <Input
  //       size="large"
  //     />
  //   </Form.Item>
  //
  //   <Form.Item<FieldType>
  //     label="Địa chỉ công ty"
  //     name="address"
  //     hasFeedback
  //     rules={[
  //       { max: 255, message: 'Tối đa 255 ký tự.'}
  //     ]}
  //   >
  //     <TextArea />
  //   </Form.Item>
  //
  //   <h3>Tài khoản supper admin</h3>
  //   <Divider style={{ marginTop: 10 }} />
  //   <Form.Item<FieldType>
  //     label="Địa chỉ email"
  //     name="email"
  //     hasFeedback
  //     rules={[
  //       { required: true, message: 'Vui lòng nhập.' },
  //       { max: 20, message: 'Tối đa 20 ký tự.'}
  //     ]}
  //   >
  //     <Input
  //       size="large"
  //     />
  //   </Form.Item>
  //
  //   <Form.Item<FieldType>
  //     label="Mật khẩu"
  //     name="password"
  //     hasFeedback
  //     rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.'}]}
  //   >
  //     <Input.Password
  //       size="large"
  //     />
  //   </Form.Item>
  //
  //   <Form.Item<FieldType>
  //     label="Xác nhận mật khẩu"
  //     name="password_confirm"
  //     hasFeedback
  //     rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.'}]}
  //   >
  //     <Input.Password
  //       size="large"
  //     />
  //   </Form.Item>
  //
  //   <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
  //     <Button
  //       type="primary"
  //       htmlType="submit"
  //       size="large"
  //       shape="round"
  //     >
  //       <LoginOutlined />Đăng ký
  //     </Button>
  //   </Form.Item>
  // </Form>
  );
}
