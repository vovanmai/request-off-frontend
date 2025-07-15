'use client'

import React, { useEffect } from 'react';
import { Table, Col, Breadcrumb, Tag, Tooltip, Button } from 'antd';
import { HomeOutlined, InfoOutlined } from '@ant-design/icons';
import { list as listOrders } from '@/api/user/order';
import numeral from 'numeral';
import Link from 'next/link';
import { ORDER_STATUS } from '@/constants/common';
import dayjs from 'dayjs';

const Order = () => {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await listOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      render: (text: string) => {
        return `dh${text}`;
      },
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'created_at',
      render: (text: string) => {
        return dayjs(text).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text: keyof typeof ORDER_STATUS | string | number) => {
        const status = ORDER_STATUS[text as keyof typeof ORDER_STATUS];
        return <Tag color={status?.color}>{status?.name || text}</Tag>;
      },
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'total_quantity',
      render: (text: number) => numeral(text).format('0,0'),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      render: (text: number) => numeral(text).format('0,0') + ' đ',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'id',
      render: (id: number) => (
        <Tooltip title="Chi tiết">
          <Link href={`tai-khoan/don-hang/${id}`}>
            <Button shape="circle" icon={<InfoOutlined />} />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Breadcrumb
          style={{ marginBottom: 12 }}
          items={[
            { title: <Link href="/"> <HomeOutlined /> Trang chủ</Link> },
            { title: <Link href="/tai-khoan">Tài khoản</Link> },
            {
              title: 'Danh sách đơn hàng',
            },
          ]}
        />
        <h3 style={{ marginBottom: 12 }}>Danh sách đơn hàng</h3>
        <Col lg={24} xs={24}>
            <Table
              loading={loading}
              dataSource={orders}
              columns={columns}
              rowKey="id"
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </Col>
      </div>
    </div>
  );
};

export default Order;
