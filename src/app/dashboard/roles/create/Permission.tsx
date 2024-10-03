import { Checkbox, Col, Row } from "antd"
import type { CheckboxProps } from 'antd'
import React, {useState} from "react";

type ActionType = 'list' | 'edit' | 'create' | 'delete' | 'detail'
interface PermissionItem {
  id: number;
  action: ActionType;
  checked: boolean;
}

type PropsType = {
  permission: PermissionItem
}

const Permission = ({ permission }: PropsType) => {
  const actions = {
    list: 'Danh sách',
    edit: 'Cập nhật',
    create: 'Tạo ',
    delete: 'Xoá',
    detail: 'Chi tiết',
  }

  // const [isCheckAll, setIsCheckAll] = useState(false)
  // const [permissionState, setPermissionsState] = useState(permissions.map((item) => ({ ...item, checked: false })));
  //
  // const selectAll: CheckboxProps['onChange'] = (e) => {
  //   const checked = e.target.checked;
  //   setIsCheckAll(checked);
  //   setPermissionsState(permissionState.map((item) => ({...item, checked: checked})))
  // };
  //
  // const handleCheckboxChange = (id: number) => {
  //   const updatedPermissions = permissionState.map((item) =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setPermissionsState(updatedPermissions);
  //
  //   setIsCheckAll(updatedPermissions.every((item) => item.checked));
  // };

  return (
    <Col xs={12} md={4}>
      <Checkbox value={permission.id}>
        { actions[permission.action] }
      </Checkbox>
    </Col>
  )
}

export default Permission