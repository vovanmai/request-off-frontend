import api from '@/api/admin/axiosClient';

export function getRoles(params: object) {
  return api.get('admin/post-categories', { params: params});
}

export function getAll() {
  return api.get('admin/post-categories');
}

export function getById(id: number) {
  return api.get(`admin/post-categories/${id}`);
}

export function create(data: object) {
  return api.post('admin/post-categories', data);
}

export function update(id: any, data: object) {
  return api.put(`admin/post-categories/${id}`, data);
}

export function updateOrder(data: object) {
  return api.post('admin/post-categories/update-order', data);
}

export function deleteCategory(id: number) {
  return api.delete(`admin/post-categories/${id}`);
}
