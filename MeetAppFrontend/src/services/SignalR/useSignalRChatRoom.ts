import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { stopHubConnection } from '@/services/SignalR/signalR';

/** SignalR chat hook, connects two users with a hub connection and cleans up after itself on useEffect return function */
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
