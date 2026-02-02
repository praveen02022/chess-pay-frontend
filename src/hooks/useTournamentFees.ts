import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

/* ---------------- TYPES ---------------- */
type FeeInput = {
  category: string
  amount: number
}

/* ---------------- CREATE FEES ---------------- */
export const useCreateTournamentFees = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      tournamentId,
      fees,
    }: {
      tournamentId: string
      fees: FeeInput[]
    }) =>
      api.post(`/tournaments/${tournamentId}/fees`, { fees }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tournament", variables.tournamentId],
      })
      queryClient.invalidateQueries({
        queryKey: ["tournament-fees", variables.tournamentId],
      })
    },
  })
}

/* ---------------- GET FEES ---------------- */
export const useTournamentFees = (tournamentId: string) => {
  return useQuery({
    queryKey: ["tournament-fees", tournamentId],
    queryFn: async () => {
      const res = await api.get(
        `/tournaments/${tournamentId}/fees`
      )
      return res.data
    },
    enabled: !!tournamentId,
  })
}

/* ---------------- UPDATE (REPLACE) FEES ---------------- */
export const useUpdateTournamentFees = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      tournamentId,
      fees,
    }: {
      tournamentId: string
      fees: FeeInput[]
    }) =>
      api.put(`/tournaments/${tournamentId}/fees`, { fees }),

    onSuccess: (_, variables) => {
      // 🔥 keep everything in sync
      queryClient.invalidateQueries({
        queryKey: ["tournament", variables.tournamentId],
      })
      queryClient.invalidateQueries({
        queryKey: ["tournament-fees", variables.tournamentId],
      })
      queryClient.invalidateQueries({
        queryKey: ["my-tournaments"],
      })
    },
  })
}
