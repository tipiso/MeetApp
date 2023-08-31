import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { getFilteredUsersService, getLikedUsersService, usersQueryKeys } from '@/services/Users/users';

function useMatches() {
  const mutateFetcher = (url: string, { arg }: { arg: string }) => getFilteredUsersService({ searchString: arg });

  const { data, ...rest } = useSWRMutation(usersQueryKeys.usersList(), mutateFetcher);

  return { data: data?.data, ...rest, pagination: data?.headers.pagination };
}

function useLikedUsers() {
  const fetcher = () => getLikedUsersService();

  const { data, ...rest } = useSWR(usersQueryKeys.likedUsers, fetcher);

  return { data: data?.data, ...rest };
}

export { useMatches, useLikedUsers };
