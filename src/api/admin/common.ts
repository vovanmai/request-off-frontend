import api from '@/api/admin/axiosClient';

export function createUpload(data: FormData, headers = {}) {
  return api.post('admin/common/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...headers,
    },
  });
}
