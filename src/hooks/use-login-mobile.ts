import { useMutation } from '@tanstack/react-query';
import { sendOtpApi, verifyOtpApi } from '@/lib/apis/auth.api';
import useAuthStore from '@/store/auth-store';

/* STEP 1 */
export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtpApi,
  });
};

/* STEP 2 */

export const useVerifyOtp = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (response: any) => {
      const data = response.data || response;
      const user = data.user;

      setAuth(user, data.tokens.access.token, data.tokens.refresh.token);
    },
  });
};
