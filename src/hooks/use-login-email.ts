import { useMutation } from '@tanstack/react-query';
import { loginWithEmailApi } from '@/lib/apis/auth.api';
import useAuthStore from '@/store/auth-store';

export const useLoginEmail = () => {
  const setAuth = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginWithEmailApi,
    onSuccess: (response: any) => {
      const data = response.data || response;
      const user = data.user;

      setAuth(user);
    },
  });
};
