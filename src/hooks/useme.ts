import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import useAuthStore from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';
import { getRedirectByRole } from '@/utils/role-redirect';

export const useMe = (enabled = true) => {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['me'],
    enabled,
    queryFn: async () => {
      const { data } = await api.get('/auth/me');

      const u = data.data;

      const normalizedUser = {
        ...u,
        role: u.role, // "organizer" | "admin" | "user"
        state_name: u.state?.state_name ?? null,
        district_name: u.district?.district_name ?? null,
        taluk_name: u.taluk?.taluk_name ?? null,
      };

      setUser(normalizedUser);

      // ✅ REDIRECT HERE (only once, correct timing)
      navigate(getRedirectByRole(normalizedUser.role), { replace: true });

      return normalizedUser;
    },
  });
};
