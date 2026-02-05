// src/hooks/use-auth-bootstrap.ts
import { useEffect } from 'react';
import useAuthStore from '@/store/auth-store';
import {
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
} from '@/constants/auth-storage';
import { getItem } from '@/lib/local-storage';

export const useAuthBootstrap = () => {
  const { setAuth, logout } = useAuthStore();

  useEffect(() => {
    const token = getItem<string>(AUTH_TOKEN_KEY);
    const refreshToken = getItem<string>(AUTH_REFRESH_TOKEN_KEY);
    const user = getItem<any>(AUTH_USER_KEY);

    if (!token || !user) {
      logout();
      return;
    }

    setAuth(user, token, refreshToken ?? undefined);
  }, [setAuth, logout]);
};
