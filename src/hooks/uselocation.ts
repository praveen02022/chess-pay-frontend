import { useQuery } from '@tanstack/react-query';
import {
  getStatesApi,
  getDistrictsByStateApi,
  getTaluksByDistrictApi,
} from '@/lib/apis/locations.api';

/* ---------------- STATES ---------------- */
export const useStates = () =>
  useQuery({
    queryKey: ['states'],
    queryFn: getStatesApi,
  });

/* ---------------- DISTRICTS ---------------- */
export const useDistricts = (stateId: string) =>
  useQuery({
    queryKey: ['districts', stateId],
    queryFn: () => getDistrictsByStateApi(stateId),
    enabled: !!stateId, // 🔥 important
  });

/* ---------------- TALUKS ---------------- */
export const useTaluks = (districtId: string) =>
  useQuery({
    queryKey: ['taluks', districtId],
    queryFn: () => getTaluksByDistrictApi(districtId),
    enabled: !!districtId,
  });
