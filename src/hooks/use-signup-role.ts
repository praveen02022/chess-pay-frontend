import { useRoles } from './use-roles';
import type { Role } from '@/lib/apis/roles.api';

const SIGNUP_ALLOWED = ['user', 'organizer'];

export const useSignupRoles = () => {
  const query = useRoles();

  const roles: Role[] = Array.isArray(query.data)
    ? query.data.filter((r) => SIGNUP_ALLOWED.includes(r.role_name))
    : [];

  return {
    ...query,
    roles,
  };
};
