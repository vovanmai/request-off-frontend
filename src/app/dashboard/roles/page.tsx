'use client'
import { Card, Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import type { SorterResult } from 'antd/es/table/interface';
import { getRoles } from '@/api/user/role'
import dayjs from 'dayjs'


import type { GetProp, TableProps } from 'antd';
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

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

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
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
  }, [searchParams]);

  const handleTableChange: TableProps<DataType>['onChange'] = async (pagination, filters, sorter) => {
    setPagination(pagination)
    console.log(pagination)
    const isSorterArray = Array.isArray(sorter);
    const sortField = isSorterArray ? sorter[0]?.field : sorter?.field;
    const sortOrder = isSorterArray ? sorter[0]?.order : sorter?.order;

    const sort = sortField ? sortField : '';
    let order = sortOrder ? sortOrder : '';
    order = order ? (order === 'ascend' ? 'asc' : 'desc') : ''
    const params = new URLSearchParams({
      page: String(pagination.current),
      per_page: String(pagination.pageSize),
      sort: String(sort),
      order: String(order),
    });
    const queryString = params.toString();
    router.push(`/dashboard/roles?${queryString}`)
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
      <Table
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
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