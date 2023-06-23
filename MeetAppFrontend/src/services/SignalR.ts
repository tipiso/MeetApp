import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';

let hubConnection: HubConnection | undefined;
const createHubConnection = (token: string) => {
  hubConnection = new HubConnectionBuilder()
    .withUrl(HUB_URL + 'presence', {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  hubConnection.start().catch((error) => console.log('[SignalR] start error:', error));
  hubConnection.on('UserIsOnline', (username) => {
    console.log('USER IS ONLINE', username);
  });
  hubConnection.on('UserIsOffline', (username) => {
    console.log('USER IS OFFLINE', username);
  });
  return hubConnection;
};

const stopHubConnection = (hubConnection?: HubConnection) => {
  if (hubConnection) {
    hubConnection.stop().catch((error) => console.log('[SignalR] stop error:', error));
  }
};

export { stopHubConnection, createHubConnection, hubConnection };
