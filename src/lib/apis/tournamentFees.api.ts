import { api } from "@/lib/api";

export const getTournamentFeesApi = (tournamentId: string) =>
  api.get(`/tournaments/${tournamentId}/fees`);

export const createTournamentFeesApi = (
  tournamentId: string,
  fees: any[]
) =>
  api.post(`/tournaments/${tournamentId}/fees`, { fees });

export const updateTournamentFeesApi = (
  tournamentId: string,
  fees: any[]
) =>
  api.put(`/tournaments/${tournamentId}/fees`, { fees });

export const deleteTournamentFeeApi = (
  tournamentId: string,
  feeId: string
) =>
  api.delete(`/tournaments/${tournamentId}/fees/${feeId}`);
