'use client'
import {Card, Button, Form, Space, Input, Select} from "antd"
import { UnorderedListOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, {useEffect, useState} from "react"
import withAuth from "@/hooks/withAuth"
import { ROUTES } from "@/constants/routes"
import { getAll } from "@/api/user/role"
import { createUser } from '@/api/user/user'
import {useRouter} from "next/navigation"
import { toast } from 'react-toastify'
import SpinLoading from "@/components/SpinLoading"
import Breadcrumb from "@/components/Breadcrumb"
import { validateMessages } from "@/helper/common";

type RoleType = {
  value: number,
  label: string
}

const Page = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [form] = Form.useForm();
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
  const [roles, setRoles] = useState<RoleType[]>([]);

  const onFinish = async (values: any) => {
    try {
      setLoadingCreate(true)
      await createUser({...values})
      toast.success('Tạo thành công!')
      router.push(ROUTES.DASHBOARD_USER_LIST)
    } catch (error: any) {
      setErrors(error?.data?.errors as Record<string, string>);
    } finally {
      setLoadingCreate(false)
    }
  };

  const onReset = () => {
    form.resetFields();
    setErrors({})
  };
  const actions = (
    <Link href={ROUTES.DASHBOARD_ROLE_LIST}>
      <Button
        size="large"
        type="primary"
      >
        <UnorderedListOutlined />Danh sách
      </Button>
    </Link>
  );

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const tailLayout = {
    wrapperCol: { offset: 5, span: 12 },
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const { data } = await getAll()
        setRoles(data.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          }
        }))
      } catch (error) {
        console.error("Error fetching", error);
      } finally {
      }
    };
    getRoles();
  }, []);


  const rules: any = {
    name: [
      { required: true },
      { max: 255 },
    ],
    email: [
      { required: true },
      { type: 'email' },
      { max: 255 },
    ],
    password: [
      { required: true },
      { min: 6 },
    ],
    password_confirmation: [
      { required: true },
      { min: 6 },
      ({ getFieldValue }: {getFieldValue: any}) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Mật khẩu không khớp.'));
        },
      }),
    ],
    role_id: [
      { required: true },
    ],
  }


  return (
    <div>
      <Breadcrumb items={[{title: 'Người dùng'}]} />
      <Card title="Tạo mới quyền" bordered={false} extra={actions}>
        <Form
          validateMessages={validateMessages}
          {...layout}
          form={form}
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={rules.name}
            validateStatus={ errors?.name ? 'error' : undefined}
            help={errors?.name ? errors?.name : undefined}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={rules.email}
            validateStatus={ errors?.email ? 'error' : undefined}
            help={errors?.email ? errors?.email : undefined}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={rules.password}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Xác nhận mật khẩu"
            rules={rules.password_confirmation}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="role_id"
            label="Quyền"
            rules={rules.role_id}>
            <Select
              size="large"
              showSearch
              options={roles}
            >
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button size="large" disabled={loadingCreate} type="primary" htmlType="submit">
                { loadingCreate ? <SpinLoading /> : <PlusCircleOutlined /> }
                Tạo
              </Button>
              <Button size="large" htmlType="button" onClick={onReset}>
                <ClearOutlined />
                Xoá
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default withAuth(Page)