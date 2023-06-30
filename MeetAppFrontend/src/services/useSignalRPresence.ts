import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { stopHubConnection } from '@/utils/signalR';

const useSignalRPresence = () => {
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

export { useSignalRPresence };
