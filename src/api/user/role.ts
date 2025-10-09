import api from '@/api/admin/axiosClient';

export function getRoles(params: object) {
  return api.get('roles', { params: params});
}

export function getAll() {
  return api.get('roles/all');
}

export function getRole(id: number) {
  return api.get(`roles/${id}`);
}

export function createRole(data: object) {
  return api.post('roles', data);
}

export function updateRole(id: number, data: object) {
  return api.put(`roles/${id}`, data);
}

export function deleteRole(id: number) {
  return api.delete(`roles/${id}`);
}