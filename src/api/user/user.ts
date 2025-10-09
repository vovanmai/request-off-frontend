import api from '@/api/admin/axiosClient';

export function getUsers(params: object) {
  return api.get('users', { params: params});
}

export function getUser(id: number) {
  return api.get(`users/${id}`);
}

export function createUser(data: object) {
  return api.post('users', data);
}

export function updateUser(id: number, data: object) {
  return api.put(`users/${id}`, data);
}

export function deleteUser(id: number) {
  return api.delete(`users/${id}`);
}