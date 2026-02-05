import { ROLES, Role } from '@/constants/roles';

export const getRedirectByRole = (role?: Role | null) => {
  if (!role) return '/login';

  switch (role) {
    case ROLES.ADMIN:
    case ROLES.SUPER_ADMIN:
      return '/admin';

    case ROLES.ORGANIZER:
      return '/organizer';

    case ROLES.USER:
      return '/';

    default:
      return '/login';
  }
};
