import useSWR from 'swr';

import { getUsersService, getUserService, usersQueryKeys } from '@/services/Users/users';

function getUsers() {
  const { data, ...rest } = useSWR(usersQueryKeys.usersList(), getUsersService);
  return { data: data?.data, ...rest };
}

function getUser(username: string | undefined) {
  const { data, ...rest } = useSWR(username, getUserService);
  return { data: data?.data, ...rest };
}

export { getUsers, getUser };
