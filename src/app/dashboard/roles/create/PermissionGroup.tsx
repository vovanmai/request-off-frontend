import { Checkbox, Col, Row } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import Permission from "./Permission";
import type { GetProp, CheckboxProps } from "antd";

type ActionType = "list" | "edit" | "create" | "delete" | "detail";
interface PermissionItem {
  id: number;
  action: ActionType;
  checked: boolean;
}

type GroupType = "user" | "role";

interface GroupPermission {
  group: GroupType;
  permissions: PermissionItem[];
}

const groups: Record<GroupType, string> = {
  user: "Người dùng",
  role: "Quyền",
};

const PermissionGroup = ({ groupPermission }: { groupPermission: GroupPermission }) => {
  const allValues = useMemo(() => groupPermission.permissions.map((item) => item.id), [groupPermission.permissions]);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (checkedValues) => {
    const checkAll = checkedValues.length === allValues.length
    setCheckedAll(checkAll)
    setCheckedList(checkedValues)
    setIndeterminate(checkedValues.length > 0 && checkedValues.length < allValues.length)
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedAll(e.target.checked)
    if (e.target.checked) {
      setCheckedList(allValues)
    } else {
      setCheckedList([])
    }
  };

  return (
    <Row key={groupPermission.group} style={{ padding: "5px 0px" }}>
      <Col span={4}>{groups[groupPermission.group]}</Col>
      <Col span={20}>
        <Row>
          <Col xs={12} md={3}>
            <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={onCheckAllChange}>
              Tất cả
            </Checkbox>
          </Col>
          <Checkbox.Group
            onChange={onChange}
            value={checkedList}
            style={{display: "block", width: "100%"}}
          >
            <Row>
              {groupPermission.permissions.map((item) => (
                <Permission key={item.id} permission={item} />
              ))}
            </Row>
          </Checkbox.Group>
        </Row>
      </Col>
    </Row>
  );
};

export default PermissionGroup;
