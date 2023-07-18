import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getUser } from '@/features/users/hooks/index';
import { useSignalRChatRoom } from '@/services/SignalR/useSignalRChatRoom';
import { Group } from '@/services/SignalR/types';
import { Message } from '@/features/messages/types';

const useUserPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
      });

      hubConnection.on('UpdatedGroup', (group: Group) => {
        if (group.connections.some((c) => c.username === user.userName)) {
          setMessages(
            messages.map((msg) => {
              if (!msg.dateRead) {
                msg.dateRead = new Date(Date.now());
              }
              return msg;
            }),
          );
        }
      });

      hubConnection.on('NewMessage', (message) => {
        console.log('New message', message);
      });
    }
  }, [hubConnection]);

  return { user, isLoading };
};

export default useUserPage;
