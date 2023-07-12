import { HubConnection } from '@microsoft/signalr';

const stopHubConnection = (hubConnection?: HubConnection) => {
  if (hubConnection) {
    hubConnection.stop().catch((error) => console.log('[SignalR] stop error:', error));
  }
};

export { stopHubConnection };
