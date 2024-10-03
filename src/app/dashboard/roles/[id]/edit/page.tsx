'use client'
import {Card, Button, Table, Breadcrumb } from "antd"
import { PlusCircleOutlined, HomeOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import React  from "react"
import withAuth from "@/hooks/withAuth";

type PropsType = {
  params: {
    id: string
  }
}

const ListRoles = ({ params }: PropsType) => {
  const router = useRouter()
  const actions = (
    <Button
      size="large"
      onClick={() => { router.push('/dashboard') }}
      type="primary"
    >
      <PlusCircleOutlined />Tạo mới
    </Button>
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

  return (
    <div>
      <Breadcrumb
        items={breadcrumbItems}
        style={{ marginBottom: 10 }}
      />
      <Card title="Tạo mới quyền" bordered={false} extra={actions}>

      </Card>
    </div>
  );
}

export default withAuth(ListRoles)
