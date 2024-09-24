'use client'
import { Card, Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SorterResult } from 'antd/es/table/interface';
import { getRoles } from '@/api/user/role'
import { useSearchParams } from 'next/navigation'

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
  const actions = (
    <Button
      onClick={() => { router.push('/dashboard') }}
      type="primary"
    >
      <PlusCircleOutlined />Tạo
    </Button>
  );

  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const searchParams = useSearchParams()

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getRoles(params)
      const { data } = response
      setData(data.data)
      setTableParams({
        ...tableParams,
        pagination: {
          current: data?.current_page,
          pageSize: data?.per_page,
          total: data.total
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  useEffect(() => {
    console.log(3333)
    const params = {
      per_page: tableParams.pagination?.pageSize,
      page: tableParams.pagination?.current,
    }
    fetchData(params)
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
  ]);

  const handleTableChange: TableProps<DataType>['onChange'] = async (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
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
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      sorter: true,
      width: '30%',
    },
  ];


  return (
    <Card title="Quyền" bordered={false} extra={actions}>
      <Table
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Card>
  );
}

export default ListRoles