import api from '@/api/user/axiosClient';


export function list(params: object = {}) {
  return api.get('products', {params});
}

export function listByCategory(slug: string, params: object = {}) {
  return api.get(`categories/${slug}/products`, {params});
}