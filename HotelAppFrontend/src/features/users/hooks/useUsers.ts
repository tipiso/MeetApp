import useSWR from 'swr';

import { getUsersService, usersQueryKeys } from '@/features/users/services/users';

export function getUsers() {
  const { data, ...rest } = useSWR(usersQueryKeys.usersList(), getUsersService);
  return { data: data?.data, ...rest };
}
