import { ReactNode, createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSignalRPresence } from '@/services/SignalR/useSignalRPresence';
import { stopHubConnection } from '@/services/SignalR/signalR';

type Props = {
  children: ReactNode;
};

export const OnlineUsersContext = createContext<string[]>([]);

export default function SignalRPresenceProvider({ children }: Props) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { createHubConnection, hubConnection } = useSignalRPresence();

  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated' && !hubConnection) {
      createHubConnection(session.data.accessToken);
    }

    if (session.status === 'unauthenticated' && hubConnection) {
      stopHubConnection(hubConnection);
    }

    return () => {
      stopHubConnection(hubConnection);
    };
  }, [session.status]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
        console.log('USER SENT YOU A MSG', username);
      });

      hubConnection.on('UserIsOnline', (username) => {
        console.log('USER IS ONLINE', username);
        setOnlineUsers([...onlineUsers, username]);
      });

      hubConnection.on('UserIsOffline', (username) => {
        console.log('USER IS OFFLINE', username);
        setOnlineUsers(onlineUsers.filter((u) => u !== username));
      });

      hubConnection.on('GetOnlineUsers', (usernames) => {
        console.log('GET ONLINE USERS', usernames);
        setOnlineUsers(usernames);
      });
    }
  }, [session.status, hubConnection]);

  return <OnlineUsersContext.Provider value={onlineUsers}>{children}</OnlineUsersContext.Provider>;
}
