'use client'
import {Card, Button, Form, Space, Input, Breadcrumb } from "antd"
import { UnorderedListOutlined, HomeOutlined, ClearOutlined, PlusCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import React, {useEffect, useState} from "react"
import withAuth from "@/hooks/withAuth"
import { ROUTES } from "@/constants/routes"
import PermissionGroup from './PermissionGroup'
import { getAll } from "@/api/user/permission";
import { createRole } from '@/api/user/role'
import {useRouter} from "next/navigation";

type ActionType = 'list' | 'edit' | 'create' | 'delete' | 'detail'
interface PermissionItem {
  id: number;
  action: ActionType;
  checked: boolean;
}

interface PermissionGroupInterface {
  group: 'user' | 'role';
  permissions: PermissionItem[];
  checkedValues: number[],
}

const ListRoles = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form] = Form.useForm();
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupInterface[]>([]);

  const onFinish = async (values: any) => {
    const permissionIds = permissionGroups.flatMap(group => group.checkedValues);

    try {
      await createRole({...values, permission_ids: permissionIds})
      router.push(ROUTES.DASHBOARD_ROLE_LIST)
    } catch (error: any) {
      setErrors(error?.data?.errors as Record<string, string>);
    }
  };

  const onReset = () => {
    form.resetFields();
    setPermissionGroups(permissionGroups.map(item => ({...item, checkedValues: []})))
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

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const response = await getAll();
        setPermissionGroups(response.data.map((item: any) => ({...item, checkedValues: [], checkedAll: false})));
      } catch (error) {
        console.error("Error fetching permissions", error);
      } finally {
      }
    };
    getPermissions();
  }, []);

  const updatePermissionGroup = (index: number, updatedData: any) => {
    setPermissionGroups(prevPermissionGroups => {
      const updatedPermissionGroups = [...prevPermissionGroups]

      updatedPermissionGroups[index] = {
        ...updatedPermissionGroups[index],
        ...updatedData
      };

      return updatedPermissionGroups
    });
  };

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
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập.' }]}
            validateStatus={ errors.name ? 'error' : ''}
            help={errors.name ? errors.name : ''}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Quyền">
            <div style={{ border: "1px solid #d9d9d9", padding: 15, borderRadius: 8}}>
              {permissionGroups.map((item, index) => {
                return <PermissionGroup
                  key={index}
                  permissionGroup={item}
                  groupIndex={index}
                  updatePermissionGroup={updatePermissionGroup}
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
