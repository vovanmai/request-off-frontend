import api from '@/api/axiosClient';

export function getCompanies(params: object) {
  return api.get('api/companies', { params: params});
}

export function login(data: object) {
  return api.post('api/login', data);
}