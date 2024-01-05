import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';

import { getFilteredUsers, usersQueryKeys } from '@/services/Users/users';
import { SearchFriendsDTO } from '@/services/Users/dtos';
import { getHobbies, hobbiesQueryKeys } from '@/services/hobbies';
import { PaginationDTO } from 'types/pagination';
import { initialPagination } from '@/utils/constants';

function useBaseMatches() {
  const mutateFetcher = (url: string, { arg }: { arg: string }) =>
    getFilteredUsers({
      minAge: '',
      maxAge: '',
      gender: '',
      hobbies: [],
      searchString: arg,
    });

  const { data, ...rest } = useSWRMutation(usersQueryKeys.usersList(), mutateFetcher);

  return { data: data?.data, ...rest, pagination: data?.headers.pagination ?? initialPagination };
}

function useMatches() {
  const mutateFetcher = (url: string, { arg }: { arg: SearchFriendsDTO & PaginationDTO }) => getFilteredUsers(arg);

  const getPage = async (pageNumber: number, formValues: SearchFriendsDTO) => {
    await rest.trigger({ ...formValues, pageNumber, pageSize: initialPagination.pageSize });
  };

  const { data, ...rest } = useSWRMutation(usersQueryKeys.usersList(), mutateFetcher);

  return { data: data?.data, ...rest, getPage, pagination: data?.headers.pagination ?? initialPagination };
}

function useGetHobbies() {
  const fetcher = (url: string) => getHobbies();

  const { ...rest } = useSWR(hobbiesQueryKeys.hobbies, fetcher);

  return {
    ...rest,
  };
}

export { useMatches, useGetHobbies, useBaseMatches };
