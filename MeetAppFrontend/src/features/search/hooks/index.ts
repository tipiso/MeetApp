import useSWR from 'swr';
import { getUsersService, usersQueryKeys } from '@/services/Users/users';

function useMatches(shouldFetch: boolean = false, searchString: string) {
  const { data, ...rest } = useSWR([usersQueryKeys.usersList(), searchString], getUsersService);
  return { data: data?.data, ...rest };
}

export { useMatches };
