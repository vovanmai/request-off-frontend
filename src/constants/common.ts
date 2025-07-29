const ROLE = {
  TYPE: {
    DEFAULT: '1-default',
    CUSTOMIZE: '2-customize',
  }
}

const USER = {
  STATUS: {
    ACTIVE: '1-active',
    INACTIVE: '2-inactive',
  }
}


const ORDER_STATUS_PENDING = 1
const ORDER_STATUS_PROCESSING = 2
const ORDER_STATUS_SHIPPING = 3
const ORDER_STATUS_DELIVERED = 4
const ORDER_STATUS_CANCELLED = 5

const ORDER_STATUS = {
  [ORDER_STATUS_PENDING]: {
    name: "Chờ xác nhận",
    color: "#f0ad4e",
  },
  [ORDER_STATUS_PROCESSING]: {
    name: "Đang xử lý",
    color: "#5bc0de",
  },
  [ORDER_STATUS_SHIPPING]: {
    name: "Đang giao hàng",
    color: "#3a62c9ff",
  },
  [ORDER_STATUS_DELIVERED]: {
    name: "Đã giao hàng",
    color: "#5cb85c",
  },
  [ORDER_STATUS_CANCELLED]: {
    name: "Đã hủy",
    color: "#d9534f",
  },
}

const USER_PRIMARY_COLOR = '#27964f'

const SLOGAN = 'Thực phẩm sạch - Cuộc sống xanh'
const WEB_NAME = "Hợp tác xã LAM NGUYỄN (LAM'S FARM)"
const HOSTNAME = "LAMSFARM.COM.VN"

export {
  ROLE,
  USER,
  USER_PRIMARY_COLOR,
  SLOGAN,
  WEB_NAME,
  HOSTNAME,
  ORDER_STATUS,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PROCESSING,
  ORDER_STATUS_SHIPPING,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED
}
