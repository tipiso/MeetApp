import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HUB_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { stopHubConnection } from '@/services/SignalR/signalR';
import { Message } from '@/features/messages/types';
import { getTokenFromSession } from '@/utils/helpers';
import { Group } from './types';

/** SignalR chat hook, connects two users with a hub connection and cleans up after itself on useEffect return function */
const useSignalRChatRoom = (recipientUsername: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const username = recipientUsername;
  const token = getTokenFromSession();

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

  useEffect(() => {
    if (!hubConnection && !!token && !!username) {
      createHubConnection(token, username);
    }
  }, [hubConnection, token, username]);

  useEffect(() => {
    if (hubConnection && !!username) {
      hubConnection.on('ReceiveMessageThread', (messages) => {
        setMessages(messages);
      });

      hubConnection.on('UpdatedGroup', (group: Group) => {
        if (group.connections.some((c) => c.username === username)) {
          setMessages(
            messages.map((msg) => {
              if (!msg.dateRead) {
                msg.dateRead = new Date(Date.now());
              }
              return msg;
            }),
          );
        }
      });

      hubConnection.on('NewMessage', (message) => {
        console.log('New message', message);
        setMessages([...messages, message]);
      });
    }
  }, [hubConnection, username]);

  const sendMessage = async (recipient: string, content: string) => {
    return hubConnection?.invoke('SendMessage', { recipientUsername: recipient, content }).catch((e) => console.log(e));
  };

  return { createHubConnection, hubConnection, sendMessage, messages };
};

export { useSignalRChatRoom };
