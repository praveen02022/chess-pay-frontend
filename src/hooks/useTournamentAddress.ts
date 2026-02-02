import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTournamentAddressApi,
  deleteTournamentAddressApi,
  getTournamentAddressApi,
  updateTournamentAddressApi,
} from "@/lib/apis/tournamentAddress.api";

/* ---------------- GET ADDRESS ---------------- */
export const useTournamentAddress = (tournamentId: string) => {
  return useQuery({
    queryKey: ["tournament-address", tournamentId],
    queryFn: () => getTournamentAddressApi(tournamentId),
    enabled: !!tournamentId,
  });
};

/* ---------------- CREATE ---------------- */
export const useCreateTournamentAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tournamentId,
      data,
    }: {
      tournamentId: string;
      data: any;
    }) => createTournamentAddressApi(tournamentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tournament-address", variables.tournamentId],
      });
    },
  });
};

/* ---------------- UPDATE ---------------- */
export const useUpdateTournamentAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tournamentId,
      data,
    }: {
      tournamentId: string;
      data: any;
    }) => updateTournamentAddressApi(tournamentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tournament-address", variables.tournamentId],
      });
    },
  });
};

/* ---------------- DELETE ---------------- */
export const useDeleteTournamentAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTournamentAddressApi,

    onSuccess: (_, tournamentId) => {
      queryClient.invalidateQueries({
        queryKey: ["tournament-address", tournamentId],
      });
    },
  });
};
