import { ROUTES } from "../../constants/routes"
import { LockFilled } from "@ant-design/icons"
import { HiUsers } from "react-icons/hi2";

const menus = [
  {
    key: ROUTES.DASHBOARD_USER_LIST,
    label: 'Người dùng',
    icon: <HiUsers />
  },
  {
    key: ROUTES.DASHBOARD_ROLE_LIST,
    label: 'Quyền',
    icon: <LockFilled />
  },
]

export default menus