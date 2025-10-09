import api from '@/api/admin/axiosClient';


export function list(params: object) {
  return api.get('admin/products', {params});
}

export function getById(id: number) {
  return api.get(`admin/products/${id}`);
}

export function create(data: object) {
  return api.post('admin/products', data);
}

export function update(id: any, data: object) {
  return api.put(`admin/products/${id}`, data);
}

export function deleteProduct(id: number) {
  return api.delete(`admin/products/${id}`);
}