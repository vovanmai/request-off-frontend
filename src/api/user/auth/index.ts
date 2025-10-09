import api from '@/api/user/axiosClient';

export function login(data: object) {
  return api.post('login', data);
}

export function register(data: object) {
  return api.post('register', data);
}

export function getProfile() {
  return api.get('me');
}

export function logout() {
  return api.get('logout');
}