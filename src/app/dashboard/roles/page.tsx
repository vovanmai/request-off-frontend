'use client'
import {Card, Button, Table, Breadcrumb } from "antd"
import { PlusCircleOutlined, HomeOutlined } from "@ant-design/icons"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState, Suspense, useCallback } from "react"
import { getRoles } from '@/api/user/role'
import dayjs from 'dayjs'
import Search from "./Search"
import { removeEmptyFields } from "@/helper/common"
import qs from 'qs'
import withAuth from "@/hooks/withAuth";
import Link from 'next/link'
import { ROUTES } from "@/constants/routes"

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
    <Link href={ROUTES.DASHBOARD_ROLE_CREATE}>
      <Button
        size="large"
        onClick={() => { router.push('/dashboard/roles/create') }}
        type="primary"
      >
        <PlusCircleOutlined />Tạo mới
      </Button>
    </Link>
  );

  type SearchDataType = {
    name?: string,
    created_at_from?: string,
    created_at_to?: string,
    updated_at_from?: string,
    updated_at_to?: string,
  }

  type SortDataType = {
    sort?: string,
    order?: string,
  }

  type QueryParamType = SearchDataType & SortDataType & {
    page?: number,
    per_page?: number,
  }

  const [searchData] = useState<SearchDataType>({
    name: searchParams.get('name') || '',
    created_at_from: searchParams.get('created_at_from') || '',
    created_at_to: searchParams.get('created_at_to') || '',
    updated_at_from: searchParams.get('updated_at_from') || '',
    updated_at_to: searchParams.get('updated_at_to') || '',
  })

  const [queryParams, setQueryParams] = useState<QueryParamType>({
    ...searchData,
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') || '',
    page: 1,
    per_page: 10,
  })

  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  })

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getRoles(removeEmptyFields(params));
      const { data: responseData } = response;
      setData(responseData.data);
      setPagination({
        current: responseData.current_page,
        pageSize: responseData.per_page,
        total: responseData.total,
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(queryParams)
  }, [queryParams]);

  const handleTableChange: TableProps<DataType>['onChange'] = async (pagination, filters, sorter) => {
    setPagination(pagination)
    const isSorterArray = Array.isArray(sorter);
    const sortField = isSorterArray ? sorter[0]?.field : sorter?.field;
    const sortOrder = isSorterArray ? sorter[0]?.order : sorter?.order;

    const sort = typeof sortField === 'string' ? sortField : '';
    let order = sortOrder ? sortOrder : '';
    order = order ? (order === 'ascend' ? 'asc' : 'desc') : ''

    const params = {
      ...queryParams,
      page: pagination.current,
      per_page: pagination.pageSize,
      sort: sort,
      order: order,
    }
    setQueryParams(params)
    const queryString = qs.stringify(removeEmptyFields(params));
    router.push(`/dashboard/roles?${queryString}`)
  }

  const onSearch = async (data: any) => {
    const params = {
      name: data.name,
      created_at_from: data.created_at_from,
      created_at_to: data.created_at_to,
      updated_at_from: data.updated_at_from,
      updated_at_to: data.updated_at_to,
    }
    setQueryParams(params)
    const queryString = qs.stringify(removeEmptyFields(params));
    router.push(`/dashboard/roles?${queryString}`)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      sorter: true,
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      sorter: true,
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

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
      <Card title="Danh sách quyền" bordered={false} extra={actions}>
        <Search
          onSearch={onSearch}
          resetForm={() => { setQueryParams({}) }}
          formData={searchData}
        />
        <div className="table-container">
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>
    </div>
  );
}

export default withAuth(ListRoles)
