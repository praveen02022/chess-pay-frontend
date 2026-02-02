import { api } from "@/lib/api";

/* ---------------- STATES ---------------- */
export const getStatesApi = async () => {
  const res = await api.post("/state", {
    filter: { is_active: true },
  });

  return res.data.data?.data ?? []; // ✅ ALWAYS ARRAY
};

/* ---------------- DISTRICTS ---------------- */
export const getDistrictsByStateApi = async (stateId: string) => {
  const res = await api.get(`/district/by-state/${stateId}`);
  return res.data.data?.data ?? []; // ✅ ALWAYS ARRAY
};

/* ---------------- TALUKS ---------------- */
export const getTaluksByDistrictApi = async (districtId: string) => {
  const res = await api.get(`/taluk/by-district/${districtId}`);
  return res.data.data?.data ?? []; // ✅ ALWAYS ARRAY
};
