import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';

import { getFilteredUsersService, getLikedUsersService, usersQueryKeys } from '@/services/Users/users';
import { SearchFriendsDTO } from '@/services/Users/dtos';
import { likeUser } from '@/services/likes';
import { getHobbies, hobbiesQueryKeys } from '@/services/hobbies';
import { PaginationDTO } from 'types/pagination';
import { initialPagination } from '@/utils/constants';

function useMatches() {
  const mutateFetcher = (url: string, { arg }: { arg: SearchFriendsDTO & PaginationDTO }) =>
    getFilteredUsersService(arg);

  const getPage = async (pageNumber: number, formValues: SearchFriendsDTO) => {
    await rest.trigger({ ...formValues, pageNumber, pageSize: initialPagination.pageSize });
  };

  const { data, ...rest } = useSWRMutation(usersQueryKeys.usersList(), mutateFetcher);

  return { data: data?.data, ...rest, getPage, pagination: data?.headers.pagination ?? initialPagination };
}

function useLikedUsers() {
  const fetcher = (url: string, { arg }: { arg: PaginationDTO }) => getLikedUsersService(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.likedUsers, fetcher);

  const getPage = async (pageNumber: number) => {
    await rest.trigger({ pageNumber, pageSize: initialPagination.pageSize });
  };

  return {
    data: data?.data,
    ...rest,
    getPage,
    pagination: data?.headers.pagination ?? initialPagination,
  };
}

function useLikeUser() {
  const fetcher = (url: string, { arg }: { arg: string }) => likeUser(arg);

  const { ...rest } = useSWRMutation(usersQueryKeys.likedUsers, fetcher);

  return {
    ...rest,
  };
}

function useGetHobbies() {
  const fetcher = (url: string) => getHobbies();

  const { ...rest } = useSWR(hobbiesQueryKeys.hobbies, fetcher);

  return {
    ...rest,
  };
}

export { useMatches, useLikedUsers, useLikeUser, useGetHobbies };
