'use client'

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb, Tag, Steps, Card, Descriptions, Typography, Table } from 'antd';
const { Paragraph } = Typography;
import { HomeOutlined } from '@ant-design/icons';
import { getDetail } from '@/api/user/order';
import numeral from 'numeral';
import Image from 'next/image';
import type { TableProps } from 'antd';
import Link from 'next/link';
import { 
  ORDER_STATUS,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PROCESSING,
  ORDER_STATUS_SHIPPING,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
 } from '@/constants/common';
import dayjs from 'dayjs';
import { title } from 'process';

const Content = () => {
  const [order, setOrder] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const params: any = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await getDetail(params.id);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const getOrderInfo = (order: any): any[] => {
    if (!order) return [];
    return [
      {
        key: 'code',
        label: 'Mã đơn hàng',
        children: (
          <Paragraph style={{ margin: 0 }} copyable>{order?.code}</Paragraph>
        ),
      },
      {
        key: 'status',
        label: 'Trạng thái',
        children: (
          <Tag color={ORDER_STATUS[order?.status as keyof typeof ORDER_STATUS]?.color}>
            {ORDER_STATUS[order?.status as keyof typeof ORDER_STATUS]?.name || order?.status}
          </Tag>
        ),
      },
      {
        key: 'created_at',
        label: 'Thời gian đặt hàng',
        children: order?.created_at,
      },
      {
        key: 'shipping_address',
        label: 'Địa chỉ giao hàng',
        children: order?.shipping_address,
        span: 2,
      },
      {
        key: 'payment_method',
        label: 'Phương thức thanh toán',
        children: 'Thanh toán khi nhận hàng',
      },
      {
        key: 'note',
        label: 'Ghi chú',
        children: order?.note,
      },
    ];
  }
  const orderSteps = [
    {
      title: ORDER_STATUS[ORDER_STATUS_PENDING].name,
      status_value: ORDER_STATUS_PENDING,
    },
    {
      title: ORDER_STATUS[ORDER_STATUS_PROCESSING].name,
      status_value: ORDER_STATUS_PROCESSING,
    },
    {
      title: ORDER_STATUS[ORDER_STATUS_SHIPPING].name,
      status_value: ORDER_STATUS_SHIPPING,
    },
    {
      title: ORDER_STATUS[ORDER_STATUS_DELIVERED].name,
      status_value: ORDER_STATUS_DELIVERED,
    },
    {
      title: ORDER_STATUS[ORDER_STATUS_CANCELLED].name,
      status_value: ORDER_STATUS_CANCELLED,
    },
    
  ]

  const getCurrentStep = (status: number) => {
    switch (status) {
      case ORDER_STATUS_PENDING:
        return 0;
      case ORDER_STATUS_PROCESSING:
        return 1;
      case ORDER_STATUS_SHIPPING:
        return 2;
      case ORDER_STATUS_DELIVERED:
        return 3;
      case ORDER_STATUS_CANCELLED:
        return 4;
      default:
        return 0;
    }
  };

  const getStepStatus = (status_value: number, current: number, orderStatus: number) => {
    if (orderStatus === ORDER_STATUS_CANCELLED) {
      if (status_value === current + 1) return 'finish';
      if (status_value == ORDER_STATUS_PENDING) return 'finish';
      return 'wait';
    }

    if (status_value < current + 1) return 'finish';
    if (status_value === current + 1) return 'process';
    return 'wait';
  };

  const currentStep = getCurrentStep(order?.status);


  const columns: TableProps['columns'] = [
    {
      render: (record: any) => {
        const product = record.product;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={`${product.preview_image.data.endpoint_url}/${product.preview_image.path}/${product.preview_image.filename}`}
              alt={product.name}
              width={179}
              height={179}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, marginRight: 12 }}
            />
            <span>{product.name}</span>
            <span>x {record.quantity}</span>
          </div>
        )
      },
    },
    {
      render: (record) => `${numeral(record.price * record.quantity).format('0,0')} đ`,
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
              title: <Link href="/tai-khoan/don-hang">Đơn hàng</Link>,
            },
            {
              title: 'Chi tiết đơn hàng',
            },
          ]}
        />
        <h3 style={{ marginBottom: 12 }}>Chi tiết đơn hàng</h3>

        <Card>
          <Steps
            current={currentStep}
            items={orderSteps.map((step) => ({
              ...step,
              status: getStepStatus(step.status_value, currentStep, order?.status),
            }))}
            style={{ marginBottom: 24 }}
          />

          <Descriptions
            bordered
            items={getOrderInfo(order)}
            style={{ marginBottom: 24 }}
          />

          <Table 
            dataSource={order?.order_details} 
            columns={columns}
            showHeader={false} 
            bordered
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Content;