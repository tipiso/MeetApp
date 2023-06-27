import { ReactNode, createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSignalR } from '@/services/SignalR';

type Props = {
  children: ReactNode;
};

export const OnlineUsersContext = createContext<string[]>([]);

export default function SignalRProvider({ children }: Props) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { createHubConnection, stopHubConnection, hubConnection } = useSignalR();

  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated' && !hubConnection) {
      createHubConnection(session.data.accessToken);
    }

    if (session.status === 'unauthenticated' && hubConnection) {
      stopHubConnection(hubConnection);
    }

    return () => {
      if (hubConnection) {
        stopHubConnection(hubConnection);
      }
    };
  }, [session.status]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on('UserIsOnline', (username) => {
        console.log('USER IS ONLINE', username);
      });

      hubConnection.on('UserIsOffline', (username) => {
        console.log('USER IS OFFLINE', username);
      });

      hubConnection.on('GetOnlineUsers', (usernames) => {
        console.log('GET ONLINE USERS', usernames);
        setOnlineUsers(usernames);
      });
    }
  }, [session.status, hubConnection]);

  return <OnlineUsersContext.Provider value={onlineUsers}>{children}</OnlineUsersContext.Provider>;
}
