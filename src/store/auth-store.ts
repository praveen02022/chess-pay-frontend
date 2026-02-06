import { create } from 'zustand';
import { api } from '@/lib/api';
import { Role } from '@/constants/roles';

export interface User {
  user_id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  alt_mobile?: string;
  role: Role;
  state_name?: string | null;
  district_name?: string | null;
  taluk_name?: string | null;
  gender?: string | null;
  dob?: string | null;
  fide_id?: string | null;
  tnsca_id?: string | null;
  aicf_id?: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
  bootstrapAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  bootstrapAuth: async () => {
    try {
      const { data } = await api.get('/auth/me');
      set({
        user: data,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore backend failure
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));

export default useAuthStore;
