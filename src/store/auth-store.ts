import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
} from '@/constants/auth-storage';
import { Role } from '@/constants/roles';

export interface User {
  user_id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  alt_mobile?: string;

  role: Role; // ✅ ONLY role name

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
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string, refreshToken?: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, token, refreshToken) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        if (refreshToken) {
          localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
        }
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

        set({
          user,
          token,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
        });
      },

      setUser: (user) =>
        set((state) => {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
          return { ...state, user };
        }),

      logout: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;
