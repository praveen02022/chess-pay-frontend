import { useMutation } from '@tanstack/react-query';
import { loginWithFideApi } from '@/lib/apis/auth.api';
import useAuthStore from '@/store/auth-store';

export const useLoginFide = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginWithFideApi,
    onSuccess: (response: any) => {
      const data = response.data || response;
      const user = data.user;

      setAuth(user, data.tokens.access.token, data.tokens.refresh.token);
    },
  });
};
