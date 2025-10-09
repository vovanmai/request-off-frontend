import api from '@/api/admin/axiosClient';

export function getRoles(params: object) {
  return api.get('admin/categories', { params: params});
}

export function getAll() {
  return api.get('admin/categories');
}

export function getById(id: number) {
  return api.get(`admin/categories/${id}`);
}

export function create(data: object) {
  return api.post('admin/categories', data);
}

export function update(id: any, data: object) {
  return api.put(`admin/categories/${id}`, data);
}

export function updateOrder(data: object) {
  return api.post('admin/categories/update-order', data);
}

export function deleteCategory(id: number) {
  return api.delete(`admin/categories/${id}`);
}