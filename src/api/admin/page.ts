import api from '@/api/admin/axiosClient';


export function list(params: object) {
  return api.get('admin/pages', {params});
}

export function getById(id: number) {
  return api.get(`admin/pages/${id}`);
}

export function create(data: object) {
  return api.post('admin/pages', data);
}

export function update(id: any, data: object) {
  return api.put(`admin/pages/${id}`, data);
}

export function deletePage(id: number) {
  return api.delete(`admin/pages/${id}`);
}