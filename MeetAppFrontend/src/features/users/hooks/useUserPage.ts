import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useGetUser } from '@/features/users/hooks/index';
import { isGivenUsernameCurrentUser } from '@/utils/helpers';

const useUserPage = () => {
  const { query } = useRouter();
  const { data } = useSession();
  const isUserDefined = 'username' in query;
  const { data: user, isLoading } = useGetUser(isUserDefined ? (query.username as string) : '');

  const canEdit = isGivenUsernameCurrentUser(query.username as string, data?.accessToken);

  return { user, isLoading, canEdit };
};

export default useUserPage;
