import { useQuery } from '@tanstack/react-query';
import { getRolesApi } from '@/lib/apis/roles.api';

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRolesApi,
  });
};
