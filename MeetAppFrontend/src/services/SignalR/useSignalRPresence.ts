import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { stopHubConnection } from '@/services/SignalR/signalR';
import { isAuthenticated } from '@/utils/helpers';

const useSignalRPresence = () => {
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const authenticated = isAuthenticated();

  const createHubConnection = (token: string) => {
    if (!authenticated) return;

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
      if (hubConnection && !authenticated) {
        stopHubConnection(hubConnection);
      }
    };
  }, [hubConnection, authenticated]);

  return { createHubConnection, hubConnection };
};

export { useSignalRPresence };
