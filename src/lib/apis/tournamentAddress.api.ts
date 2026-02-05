import { api } from '@/lib/api';

/* ---------------- CREATE ---------------- */
export const createTournamentAddressApi = (
  tournamentId: string,
  data: {
    address_one: string;
    pincode: string;
    state_id: string;
    district_id: string;
    taluk_id: string;
    lat?: number;
    lan?: number;
  }
) => {
  return api.post(`/tournaments/register/${tournamentId}/address`, data);
};

/* ---------------- GET ---------------- */
export const getTournamentAddressApi = (tournamentId: string) => {
  return api.get(`/tournaments/${tournamentId}/address`);
};

/* ---------------- UPDATE ---------------- */
export const updateTournamentAddressApi = (
  tournamentId: string,
  data: Partial<{
    address_one: string;
    pincode: string;
    state_id: string;
    district_id: string;
    taluk_id: string;
    lat: number;
    lan: number;
  }>
) => {
  return api.put(`/tournaments/${tournamentId}/address`, data);
};

/* ---------------- DELETE ---------------- */
export const deleteTournamentAddressApi = (tournamentId: string) => {
  return api.delete(`/tournaments/${tournamentId}/address`);
};
