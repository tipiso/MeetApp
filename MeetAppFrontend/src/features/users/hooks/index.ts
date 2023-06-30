import useSWR from 'swr';

import { getUsersService, getUserService, usersQueryKeys } from '@/features/users/services/users';

function getUsers() {
  const { data, ...rest } = useSWR(usersQueryKeys.usersList(), getUsersService);
  return { data: data?.data, ...rest };
}

function getUser(username: string) {
  const { data, ...rest } = useSWR(username, getUserService);
  return { data: data?.data, ...rest };
}

export { getUsers, getUser };
