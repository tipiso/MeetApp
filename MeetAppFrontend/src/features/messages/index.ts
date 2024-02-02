import { getMessageThread, messagesQueryKeys, getMessagesForUser, getUserConversations } from '@/services/messages';
import useSWR from 'swr';

const useMessageThread = (recipient: string) => {
  const fetcher = (url: string) => getMessageThread(recipient);

  const { ...rest } = useSWR(messagesQueryKeys.messagesThread(), fetcher);

  return { ...rest, data: rest.data?.data };
};

const useGetUserMessages = () => {
  const fetcher = (url: string) => getMessagesForUser();

  const { ...rest } = useSWR(messagesQueryKeys.messages, fetcher);

  return { ...rest, data: rest.data?.data };
};

const useGetUserConversations = () => {
  const fetcher = (url: string) => getUserConversations();

  const { ...rest } = useSWR(messagesQueryKeys.messageConversations(), fetcher);

  return { ...rest, data: rest.data?.data };
};

export { useMessageThread, useGetUserMessages, useGetUserConversations };
