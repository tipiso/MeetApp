import { ReactElement, useEffect } from 'react';
import Layout from '@/components/Layouts/Layout';
import { useRouter } from 'next/router';
import { getUser } from '@/features/users/hooks';
import { useSignalRChatRoom } from '@/services/useSignalRChatRoom';
import { useSession } from 'next-auth/react';

const UserPage = () => {
  const { query } = useRouter();
  const { data } = useSession();
  const isUserDefined = 'username' in query;
  const { data: user, isLoading } = getUser(isUserDefined ? (query.username as string) : '');
  const { createHubConnection, hubConnection } = useSignalRChatRoom();

  useEffect(() => {
    if (!hubConnection && !!data && !!user) {
      createHubConnection(data.accessToken, user.userName);
    }
  }, [hubConnection, user]);

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div>
      <span>{user.id}</span>
      <span>{user.userName}</span>
      <span>{user.age}</span>
    </div>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

UserPage.secured = true;
export default UserPage;
