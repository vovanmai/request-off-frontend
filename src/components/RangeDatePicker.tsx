import React from 'react';
import { Space, DatePicker, Input, Form } from 'antd';

const RangeDatePicker = ({ fromName, toName, fromPlaceholder, toPlaceholder }) => {
  return (
    <Space.Compact block>
      <Form.Item
        name={fromName || "created_at_from"}
        noStyle
      >
        <DatePicker
          style={{ width: '100%' }}
          size="large"
          showTime
          placeholder={fromPlaceholder || "Bắt đầu"}
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
        name={toName || "created_at_to"}
        noStyle
      >
        <DatePicker
          style={{ width: '100%' }}
          size="large"
          showTime
          placeholder={toPlaceholder || "Kết thúc"}
        />
      </Form.Item>
    </Space.Compact>
  );
};

export default RangeDatePicker;
