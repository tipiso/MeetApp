import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
  getUsers,
  getUser,
  usersQueryKeys,
  updateUser,
  addPhoto,
  getLikedUsers,
  getLikedUsersWithPagination,
} from '@/services/Users/users';
import { LikedUsersDTO, UpdateUserDTO } from '@/services/Users/dtos';
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

function useLikedUsersWithPagination() {
  const fetcher = (url: string, { arg }: { arg: PaginationDTO & Partial<LikedUsersDTO> }) =>
    getLikedUsersWithPagination(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.likedUsers, fetcher);

  const getPage = async ({
    pageNumber,
    userId,
    predicate,
    pageSize = initialPagination.pageSize,
  }: PaginationDTO & Partial<LikedUsersDTO>) => {
    await rest.trigger({ pageNumber, pageSize, userId, predicate });
  };

  return {
    data: data?.data,
    ...rest,
    getPage,
    pagination: data?.headers.pagination ?? initialPagination,
  };
}

function useLikedUsers() {
  const fetcher = (url: string, { arg }: { arg: Partial<LikedUsersDTO> }) => getLikedUsers(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.likedUsers, fetcher);

  const getUsers = ({ predicate, userId }: Partial<LikedUsersDTO>) => {
    rest.trigger({ predicate, userId });
  };

  return {
    data: data?.data,
    getUsers,
    ...rest,
  };
}

function useLikeUser() {
  const fetcher = (url: string, { arg }: { arg: string }) => likeUser(arg);

  const { ...rest } = useSWRMutation(usersQueryKeys.likedUsers, fetcher);

  return {
    ...rest,
  };
}

export { useGetUser, useGetUsers, useUpdateUser, useAddPhoto, useLikeUser, useLikedUsersWithPagination, useLikedUsers };
