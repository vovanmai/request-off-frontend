import api from '@/api/user/axiosClient';

export function list(params: object = {}) {
  return api.get('pages', { params });
}

export function getById(id: number) {
  return api.get(`categories/${id}`);
}
