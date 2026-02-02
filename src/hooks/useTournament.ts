import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTournamentApi,
  deleteTournamentApi,
  getTournamentApi,
  getTournamentsApi,
  listMyTournamentsApi,
  updateTournamentApi,
  
} from "@/lib/apis/tournament.api";

/* ---------------- CREATE ---------------- */
export const useCreateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTournamentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
  });
};

/* ---------------- LIST ---------------- */
export const useTournaments = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: getTournamentsApi,
  });
};

/* ---------------- GET BY ID ---------------- */
export const useTournament = (tournamentId: string) => {
  return useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: () => getTournamentApi(tournamentId),
    enabled: !!tournamentId,
  });
};

export const useMyTournaments = () => {
  return useQuery({
    queryKey: ["my-tournaments"],
    queryFn: listMyTournamentsApi,
  });
};
/* ---------------- UPDATE ---------------- */
export const useUpdateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tournamentId,
      data,
    }: {
      tournamentId: string;
      data: any;
    }) => updateTournamentApi(tournamentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tournament", variables.tournamentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tournaments"],
      });
    },
  });
};

/* ---------------- DELETE ---------------- */
export const useDeleteTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTournamentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
  });
};

// ---------------- CUSTOM HOOK TO GET TOURNAMENT DETAILS FROM MY TOURNAMENTS ----------------

export const useTournamentDetails = (tournamentId: string) => {
  const { data = [], isLoading } = useMyTournaments()

  const tournament = data.find(
    (t: any) => t.tournament_id === tournamentId
  )

  return { tournament, isLoading }
}

