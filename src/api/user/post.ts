import api from '@/api/user/axiosClient';


export function list(params: object = {}) {
  return api.get('posts', {params});
}

export function listByCategory(slug: string, params: object = {}) {
  return api.get(`categories/${slug}/posts`, {params});
}