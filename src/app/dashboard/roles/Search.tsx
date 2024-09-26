import { Button, Col, Form, Input, Row, Space, theme, DatePicker } from "antd";
import { ClearOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs"
import RangeDatePicker from '@/components/RangeDatePicker'

const Search = ({ onSearch }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm()
  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    padding: '0px 0px 24px 0px',
  };
  const searchParams = useSearchParams()

  const onSubmit = (values: any) => {
    if (values.created_at_from) {
      values.created_at_from = dayjs(values.created_at_from).format('YYYY-MM-DD HH:mm:ss')
    }
    if (values.created_at_to) {
      values.created_at_to = dayjs(values.created_at_to).format('YYYY-MM-DD HH:mm:ss')
    }

    if (values.updated_at_from) {
      values.updated_at_from = dayjs(values.updated_at_from).format('YYYY-MM-DD HH:mm:ss')
    }

    if (values.updated_at_to) {
      values.updated_at_to = dayjs(values.updated_at_to).format('YYYY-MM-DD HH:mm:ss')
    }
    onSearch(values)
  };

  useEffect(() => {
    let createdAtFrom = searchParams.get('created_at_from')
    let createdAtTo = searchParams.get('created_at_to')

    let updatedAtFrom = searchParams.get('updated_at_from')
    let updatedAtTo = searchParams.get('updated_at_to')

    form.setFieldsValue({
      name: searchParams.get('name') || '',
      created_at_from: createdAtFrom ? dayjs(createdAtFrom) : '',
      created_at_to: createdAtTo ? dayjs(createdAtTo) : '',
      updated_at_from: updatedAtFrom ? dayjs(updatedAtFrom) : '',
      updated_at_to: updatedAtTo ? dayjs(updatedAtTo) : '',
    });
  }, [])

  const clearForm = () => {
    form.resetFields();
  }
  return (
    <Form form={form}
      layout="vertical"
      style={formStyle}
      onFinish={onSubmit}
    >
      <Row gutter={30}>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            name="name"
            label="Tên"
          >
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={9}>
          <Form.Item
            label="Ngày tạo"
          >
            <RangeDatePicker/>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={9}>
          <Form.Item
            label="Ngày cập nhật"
          >
            <RangeDatePicker
              fromName="updated_at_from"
              toName="updated_at_to"
            />
          </Form.Item>
        </Col>
      </Row>
      <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button size="large" type="primary" htmlType="submit">
            <SearchOutlined />Tìm kiếm
          </Button>
          <Button
            size="large"
            onClick={clearForm}
          >
            <ClearOutlined />Xoá
          </Button>
          <Button size="large" style={{ color: colorPrimary }} onClick={() => {
            setExpand(!expand);
          }} type="link"><DownOutlined rotate={expand ? 180 : 0} /> Xem thêm</Button>
        </Space>
      </div>
    </Form>
  )
}

export default Search