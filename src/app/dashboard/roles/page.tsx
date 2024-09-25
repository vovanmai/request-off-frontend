'use client'
import { Card, Button, Table, Col, Form, Input, Select, Row, Space } from "antd";
import { PlusCircleOutlined, DownOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getRoles } from '@/api/user/role'
import dayjs from 'dayjs'

import type { GetProp, TableProps } from 'antd';
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  id: number
  name: string;
  created_at: string;
  updated_at: string;
}

const ListRoles = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const actions = (
    <Button
      onClick={() => { router.push('/dashboard') }}
      type="primary"
    >
      <PlusCircleOutlined />Tạo mới
    </Button>
  );

  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    name: '',
  });

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  })

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getRoles(params)
      const { data } = response
      setData(data.data)
      setPagination({
        current: data?.current_page,
        pageSize: data?.per_page,
        total: data.total
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  useEffect(() => {
    const params = {
      name: searchParams.get('name'),
      per_page: searchParams.get('per_page'),
      page: searchParams.get('page'),
      sort: searchParams.get('sort'),
      order: searchParams.get('order'),
    }
    form.setFieldsValue({
      name: searchParams.get('name') || '',
    });

    fetchData(params)
  }, []);

  const handleTableChange: TableProps<DataType>['onChange'] = async (pagination, filters, sorter) => {
    setPagination(pagination)
    const isSorterArray = Array.isArray(sorter);
    const sortField = isSorterArray ? sorter[0]?.field : sorter?.field;
    const sortOrder = isSorterArray ? sorter[0]?.order : sorter?.order;

    const sort = sortField ? sortField : '';
    let order = sortOrder ? sortOrder : '';
    order = order ? (order === 'ascend' ? 'asc' : 'desc') : ''
    const paramsQuery = {
      name: String(searchData.name),
      page: String(pagination.current),
      per_page: String(pagination.pageSize),
      sort: String(sort),
      order: String(order),
    }
    const params = new URLSearchParams(paramsQuery);
    const queryString = params.toString();
    router.push(`/dashboard/roles?${queryString}`)
    console.log(searchData)
    fetchData({
      ...paramsQuery
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: true,
      width: '30%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      sorter: true,
      width: '30%',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      sorter: true,
      width: '30%',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  const [form] = Form.useForm()
  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    padding: '0px 0px 24px 0px',
  };
  const onSearch = (values: any) => {
    setSearchData(values)
    const params = new URLSearchParams({
      name: String(values.name),
    });
    const queryString = params.toString();
    router.push(`/dashboard/roles?${queryString}`)
    fetchData(values)
  };
  const [expand, setExpand] = useState(false);

  return (
    <Card title="Quyền" bordered={false} extra={actions}>
      <Form form={form}
        layout="vertical"
        style={formStyle}
        onFinish={onSearch}
        initialValues={searchData}
      >
        <Row gutter={30}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="name"
              label="Tên"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="created_at"
              label="Ngày tạo"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="updated_at"
              label="Ngày cập nhật"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              <SearchOutlined />Tìm kiếm
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              <ClearOutlined />Xoá
            </Button>
            <Button onClick={() => {
              setExpand(!expand);
            }} type="link"><DownOutlined rotate={expand ? 180 : 0} /> Xem thêm</Button>
          </Space>
        </div>
      </Form>
      <Table
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content', y: 400 }}
      />
    </Card>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading roles...</div>}>
      <ListRoles />
    </Suspense>
  );
}