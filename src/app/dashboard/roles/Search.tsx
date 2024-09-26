import { Button, Col, Form, Input, Row, Space, theme, DatePicker } from "antd";
import { ClearOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs"

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
    onSearch(values)
  };

  useEffect(() => {
    let createdAtFrom = searchParams.get('created_at_from')
    let createdAtTo = searchParams.get('created_at_to')

    form.setFieldsValue({
      name: searchParams.get('name') || '',
      created_at_from: createdAtFrom ? dayjs(createdAtFrom) : '',
      created_at_to: createdAtTo ? dayjs(createdAtTo) : '',
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
        <Col xs={24} sm={12} md={7}>
          <Form.Item
            name="name"
            label="Tên"
          >
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={10}>
          <Form.Item
            label="Ngày tạo"
          >
            <Space.Compact block>
              <Form.Item
                name="created_at_from"
                noStyle
              >
                <DatePicker
                  style={{ width: '100%'}}
                  size="large"
                  showTime
                  placeholder="Bắt đầu"
                />
              </Form.Item>
              <Input
                size={"large"}
                style={{
                  width: '50px',
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item
                name="created_at_to"
                noStyle
              >
                <DatePicker
                  style={{ width: '100%'}}
                  size="large"
                  showTime
                  placeholder="Kết thúc"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={7}>
          <Form.Item
            name="updated_at"
            label="Ngày cập nhật"
          >
            <Input size="large" />
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