import useSWR from 'swr';
import { getFilteredUsersService, usersQueryKeys } from '@/services/Users/users';

function useMatches(shouldFetch: boolean = false, searchString: string) {
  const fetcher = ([_, searchString]: [_: string, seachString: string]) => getFilteredUsersService({ searchString });

  const { data, ...rest } = useSWR(shouldFetch ? [usersQueryKeys.usersList(), searchString] : null, fetcher);

  return { data: data?.data, ...rest };
}

export { useMatches };
