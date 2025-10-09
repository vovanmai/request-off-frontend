import api from '@/api/admin/axiosClient';

export function list(params: object) {
  return api.get('admin/users', { params: params});
}

export function show(id: number) {
  return api.get(`admin/users/${id}`);
}
