import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('carts', {params});
}

export function create(data: object) {
  return api.post('carts', data);
}

export function update(id: any, data: object) {
  return api.put('carts/' + id, data);
}

export function deleteCart(id: any) {
  return api.delete('carts/' + id);
}
