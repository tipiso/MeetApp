import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
  getUsersService,
  getUserService,
  usersQueryKeys,
  updateUserService,
  addPhotoService,
} from '@/services/Users/users';
import { UpdateUserDTO } from '@/services/Users/dtos';

function useGetUsers() {
  const { data, ...rest } = useSWR(usersQueryKeys.usersList(), getUsersService);
  return { data: data?.data, ...rest };
}

function useGetUser(username: string | undefined) {
  const { data, ...rest } = useSWR(username, getUserService);
  return { data: data?.data, ...rest };
}

function useUpdateUser() {
  const mutateFetcher = (url: string, { arg }: { arg: UpdateUserDTO }) => updateUserService(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.updateUser(), mutateFetcher);

  return { data: data?.data, ...rest };
}

function useAddPhoto() {
  const mutateFetcher = (url: string, { arg }: { arg: File }) => addPhotoService(arg);

  const { data, ...rest } = useSWRMutation(usersQueryKeys.updateUser(), mutateFetcher);

  return { data: data?.data, ...rest };
}

export { useGetUser, useGetUsers, useUpdateUser, useAddPhoto };
