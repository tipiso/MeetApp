import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getFilteredUsersService, usersQueryKeys } from '@/services/Users/users';

function useMatches(shouldFetch: boolean = false, searchString: string) {
  const mutateFetcher = (url: string, { arg }: { arg: string }) => getFilteredUsersService({ searchString: arg });

  const { data, ...rest } = useSWRMutation(usersQueryKeys.usersList(), mutateFetcher);

  return { data: data?.data, ...rest };
}

export { useMatches };
