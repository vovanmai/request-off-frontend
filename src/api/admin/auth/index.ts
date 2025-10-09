import api from '@/api/admin/axiosClient';

export function getCompanies(params: object) {
  return api.get('companies', { params: params});
}

export function login(data: object) {
  return api.post('admin/login', data);
}

export function getProfile() {
  return api.get('admin/me');
}

export function logout() {
  return api.get('admin/logout');
}