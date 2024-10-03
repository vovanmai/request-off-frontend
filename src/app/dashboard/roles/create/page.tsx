'use client'
import {Card, Button, Form, Space, Input, Breadcrumb, Col, Row, Checkbox } from "antd"
import { UnorderedListOutlined, HomeOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import React, {useEffect, useState} from "react"
import withAuth from "@/hooks/withAuth"
import { ROUTES } from "@/constants/routes"
import PermissionGroup from './PermissionGroup'
import { getAll } from "../../../../api/user/permission";

const ListRoles = () => {
  const router = useRouter()
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    const checkedPermissions = permissions.flatMap(item => item.permissions.filter(p => p.checked));
    console.log(checkedPermissions);
  };

  const onReset = () => {
    form.resetFields();
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

  const breadcrumbItems = [
    {
      href: '/dashboard',
      title: <HomeOutlined />,
    },
    {
      title: 'Quyền',
    },
  ]

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 17 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  type ActionType = 'list' | 'edit' | 'create' | 'delete' | 'detail'
  interface PermissionItem {
    id: number;
    action: ActionType;
    checked: boolean;
  }

  interface GroupPermission {
    group: 'user' | 'role';
    permissions: PermissionItem[];
  }

  const [permissions, setPermissions] = useState<GroupPermission[]>([]);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const response = await getAll();
        setPermissions(response.data);
      } catch (error) {
        console.error("Error fetching permissions", error);
      } finally {
      }
    };
    getPermissions();
  }, []);

  return (
    <div>
      <Breadcrumb
        items={breadcrumbItems}
        style={{ marginBottom: 10 }}
      />
      <Card title="Tạo mới quyền" bordered={false} extra={actions}>
        <Form
          {...layout}
          form={form}
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập.' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Quyền">
            <div style={{ border: "1px solid #d9d9d9", padding: 15, borderRadius: 8}}>
              {permissions.map((item, key) => {
                return <PermissionGroup
                  key={key}
                  groupPermission={item}
                />
              })}
            </div>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                <PlusCircleOutlined />Tạo
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

export default withAuth(ListRoles)
