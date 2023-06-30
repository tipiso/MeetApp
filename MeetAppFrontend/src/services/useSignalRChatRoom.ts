import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { User } from '@/types/users';
import { stopHubConnection } from '@/utils/signalR';

const useSignalRChatRoom = () => {
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const createHubConnection = (userToken: string, otherUsername: string) => {
    setHubConnection(
      new HubConnectionBuilder()
        .withUrl(HUB_URL + `message?user=${otherUsername}`, {
          accessTokenFactory: () => userToken,
        })
        .withAutomaticReconnect()
        .build(),
    );
  };

  useEffect(() => {
    if (hubConnection && hubConnection.state === 'Disconnected') {
      hubConnection?.start().catch((error) => console.log('[SignalR] start error:', error));
    }

    return () => {
      if (hubConnection) {
        stopHubConnection(hubConnection);
      }
    };
  }, [hubConnection]);

  return { createHubConnection, hubConnection };
};

export { useSignalRChatRoom };
