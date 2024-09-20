import api from '@/api/axiosClient';

export function loginByEmail(params: object) {
  return api.get('api/login/verify-email', { params: params});
}
