import useSWRMutation from 'swr/mutation';

import { getFilteredUsersService, getLikedUsersService, usersQueryKeys } from '@/services/Users/users';

function useMatches() {
  const mutateFetcher = (url: string, { arg }: { arg: string }) => getFilteredUsersService({ searchString: arg });

  const { data, ...rest } = useSWRMutation(usersQueryKeys.usersList(), mutateFetcher);

  return { data: data?.data, ...rest, pagination: data?.headers.pagination };
}

function useLikedUsers() {
  const fetcher = (url: string, { arg }: { arg: { pageNumber: number; pageSize: number } }) =>
    getLikedUsersService(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.likedUsers, fetcher);

  const getPage = async (pageNumber: number) => {
    await rest.trigger({ pageNumber, pageSize: 8 });
  };

  return {
    data: data?.data,
    ...rest,
    getPage,
    pagination: {
      pageSize: 8,
      totalPage: 2,
      currentPage: 1,
      totalSize: 12,
    },
  };
}

export { useMatches, useLikedUsers };
