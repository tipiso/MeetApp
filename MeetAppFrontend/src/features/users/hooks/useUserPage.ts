import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useGetUser } from '@/features/users/hooks/index';
import { useSignalRChatRoom } from '@/services/SignalR/useSignalRChatRoom';
import { Group } from '@/services/SignalR/types';
import { Message } from '@/features/messages/types';
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
