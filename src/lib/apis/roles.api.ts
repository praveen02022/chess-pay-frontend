import { api } from '@/lib/api';

export interface Role {
  role_id: string;
  role_name: 'superAdmin' | 'admin' | 'organizer' | 'user';
  is_active: boolean;
}

export const getRolesApi = async (): Promise<Role[]> => {
  const res = await api.get('/roles');

  // ✅ normalize response
  return Array.isArray(res.data) ? res.data : res.data.data;
};
