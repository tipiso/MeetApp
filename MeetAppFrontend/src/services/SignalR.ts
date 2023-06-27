import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';

const useSignalR = () => {
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const createHubConnection = (token: string) => {
    setHubConnection(
      new HubConnectionBuilder()
        .withUrl(HUB_URL + 'presence', {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build(),
    );
  };

  const stopHubConnection = (hubConnection?: HubConnection) => {
    if (hubConnection) {
      hubConnection.stop().catch((error) => console.log('[SignalR] stop error:', error));
    }
  };

  useEffect(() => {
    if (hubConnection && hubConnection.state === 'Disconnected') {
      hubConnection?.start().catch((error) => console.log('[SignalR] start error:', error));
    }
  }, [hubConnection]);

  return { createHubConnection, hubConnection, stopHubConnection };
};

export { useSignalR };
