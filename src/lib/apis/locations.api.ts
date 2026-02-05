import { api } from '@/lib/api';
import { toast } from 'react-toastify';

/* ---------------- STATES ---------------- */
export const getStatesApi = async () => {
  try {
    const res = await api.post('/state', {
      filter: { is_active: true },
    });

    return res.data.data?.data ?? [];
  } catch {
    toast.error('Failed to load states');
    return [];
  }
};

/* ---------------- DISTRICTS ---------------- */
export const getDistrictsByStateApi = async (stateId: string) => {
  try {
    const res = await api.get(`/district/by-state/${stateId}`);

    return res.data.data?.data ?? [];
  } catch {
    toast.error('Failed to load districts');
    return [];
  }
};

/* ---------------- TALUKS ---------------- */
export const getTaluksByDistrictApi = async (districtId: string) => {
  try {
    const res = await api.get(`/taluk/by-district/${districtId}`);

    return res.data.data?.data ?? [];
  } catch {
    toast.error('Failed to load taluks');
    return [];
  }
};
