import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { getUsers, getUser, usersQueryKeys, updateUser, addPhoto, getLikedUsers } from '@/services/Users/users';
import { UpdateUserDTO } from '@/services/Users/dtos';
import { initialPagination } from '@/utils/constants';
import { PaginationDTO } from 'types/pagination';
import { likeUser } from '@/services/likes';

function useGetUsers() {
  const { data, ...rest } = useSWR(usersQueryKeys.usersList(), getUsers);
  return { data: data?.data, ...rest };
}

function useGetUser(username: string | undefined) {
  const { data, ...rest } = useSWR(username, getUser);
  return { data: data?.data, ...rest };
}

function useUpdateUser() {
  const mutateFetcher = (url: string, { arg }: { arg: UpdateUserDTO }) => updateUser(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.updateUser(), mutateFetcher);

  return { data: data?.data, ...rest };
}

function useAddPhoto() {
  const mutateFetcher = (url: string, { arg }: { arg: File }) => addPhoto(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.updateUser(), mutateFetcher);

  return { data: data?.data, ...rest };
}

function useLikedUsers() {
  const fetcher = (url: string, { arg }: { arg: PaginationDTO }) => getLikedUsers(arg);

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

export { useGetUser, useGetUsers, useUpdateUser, useAddPhoto, useLikeUser, useLikedUsers };
