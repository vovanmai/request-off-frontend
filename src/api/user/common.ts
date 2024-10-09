import api from '@/api/axiosClient';

export function createFile(data: any, header = {}) {
  return api.post('api/files', data, header);
}
