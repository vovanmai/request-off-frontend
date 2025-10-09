import api from '@/api/admin/axiosClient';

export function getAll(params: object = {}) {
  return api.get('permissions', { params: params});
}

