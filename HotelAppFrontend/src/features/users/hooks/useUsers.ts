import useSWR from 'swr';
import { queryKeys } from '@/utils/url';
import { getUsersService } from '@/features/users/services/users';

export function getUsers() {
  const { data, ...rest } = useSWR(queryKeys.usersList(), getUsersService);
  return { data: data?.data, ...rest };
}
