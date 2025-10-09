import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('orders', {params});
}

export function getDetail(id: number) {
  return api.get(`orders/${id}`);
}

export function create(data: object) {
  return api.post('orders', data);
}

export function update(id: any, data: object) {
  return api.put('orders/' + id, data);
}

