import api from '@/api/admin/axiosClient';


export function list(params: object) {
  return api.get('admin/posts', {params});
}

export function getById(id: number) {
  return api.get(`admin/posts/${id}`);
}

export function create(data: object) {
  return api.post('admin/posts', data);
}

export function update(id: any, data: object) {
  return api.put(`admin/posts/${id}`, data);
}

export function deletePost(id: number) {
  return api.delete(`admin/posts/${id}`);
}