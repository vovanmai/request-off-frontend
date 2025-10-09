import api from '@/api/admin/axiosClient';

export function createUpload(data: any, header = {}) {
  return api.post('uploads', data, header);
}
