import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getUser } from '@/features/users/hooks/index';
import { useSignalRChatRoom } from '@/services/useSignalRChatRoom';

const useUserPage = () => {
  const [messages, setMessages] = useState([]);
  const { query } = useRouter();
  const { data } = useSession();
  const isUserDefined = 'username' in query;
  const { data: user, isLoading } = getUser(isUserDefined ? (query.username as string) : '');
  /**TODO: Will have to move whole chat connection to messages tab / component */
  const { createHubConnection, hubConnection } = useSignalRChatRoom();

  useEffect(() => {
    if (!hubConnection && !!data && !!user) {
      createHubConnection(data.accessToken, user.userName);
    }
  }, [hubConnection, user]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on('ReceiveMessageThread', (messages) => {
        setMessages(messages);
        console.log('USER WROTE A MESSAGE', messages);
      });
    }
  }, [hubConnection]);
  console.log('STATE <MESSAGE', messages);
  return { user, isLoading };
};

export default useUserPage;
