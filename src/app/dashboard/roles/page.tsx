'use client'
import {Card, Button, Table } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { getRoles } from '@/api/user/role'
import dayjs from 'dayjs'
import Search from "./Search"

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
      size="large"
      onClick={() => { router.push('/dashboard') }}
      type="primary"
    >
      <PlusCircleOutlined />Tạo mới
    </Button>
  );

  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  type SearchData = {
    name?: string,
    created_at_from?: string,
    created_at_to?: string,
    updated_at_from?: string,
    updated_at_to?: string,
  }
  const [searchData, setSearchData] = useState<SearchData>({
    name: '',
    created_at_from: '',
    created_at_to: '',
    updated_at_from: '',
    updated_at_to: '',
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
    const queryString = params.toString()
    router.push(`/dashboard/roles?${queryString}`)
    await fetchData({
      ...paramsQuery
    })
  }

  const onSearch = async (data) => {
    setSearchData(data)
    const params = new URLSearchParams({
      name: String(data.name),
      created_at_from: String(data.created_at_from),
      created_at_to: String(data.created_at_to),
      updated_at_from: String(data.updated_at_from),
      updated_at_to: String(data.updated_at_to),
    });
    const queryString = params.toString();
    router.push(`/dashboard/roles?${queryString}`)
    await fetchData(data)
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

  return (
    <Card title="Quyền" bordered={false} extra={actions}>
      <Search
        onSearch={onSearch}
      />
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
