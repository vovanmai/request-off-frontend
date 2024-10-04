import api from '@/api/axiosClient';

export function getRoles(params: object) {
  return api.get('api/roles', { params: params});
}

export function createRole(data: object) {
  return api.post('api/roles', data);
}

