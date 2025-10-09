import api from '@/api/admin/axiosClient';

export function list(params: object = {}) {
  return api.get('admin/settings', {params});
}

export function create(data: object) {
  return api.post('admin/settings', data);
}