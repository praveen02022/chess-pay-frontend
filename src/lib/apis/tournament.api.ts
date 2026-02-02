import { api } from "@/lib/api";

export const createTournamentApi = (payload: any) =>
  api.post("/tournaments/register", payload);

export const getTournamentsApi = () =>
  api.get("/tournaments");

export const getTournamentApi = (id: string) =>
  api.get(`/tournaments/${id}`);

export const updateTournamentApi = (id: string, payload: any) =>
  api.put(`/tournaments/${id}`, payload);

export const deleteTournamentApi = (id: string) =>
  api.delete(`/tournaments/${id}`);

export const listMyTournamentsApi = async () => {
  const res = await api.post("/tournaments/organizer/listwithaddress", {
    filter: {},
    options: {
      skip: 0,
      limit: 20,
      sortBy: "created_at",
      sortType: "desc",
    },
    include: {
      address: {
        include: {
          district: true,
          state: true,
          taluk: true,
        },
      },
      fees: true,
    },
    select: {},
  });

  
  return res.data.data.data;
};
