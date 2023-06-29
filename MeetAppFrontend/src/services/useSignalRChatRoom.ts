import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { User } from '@/types/users';

const useSignalRChatRoom = () => {
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const createHubConnection = (user: User, otherUsername: string) => {
    setHubConnection(
      new HubConnectionBuilder()
        .withUrl(HUB_URL + `message?user=${otherUsername}`, {
          accessTokenFactory: () => user.token,
        })
        .withAutomaticReconnect()
        .build(),
    );
  };

  useEffect(() => {
    if (hubConnection && hubConnection.state === 'Disconnected') {
      hubConnection?.start().catch((error) => console.log('[SignalR] start error:', error));
    }
  }, [hubConnection]);

  return { createHubConnection, hubConnection };
};

export { useSignalRChatRoom };
