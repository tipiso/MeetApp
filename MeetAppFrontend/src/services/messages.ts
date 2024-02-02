import { Message } from '@/features/messages/types';
import { api } from '@/utils/axios';
import { conversationsUrl, messagesUrl, threadUrl } from '@/utils/url';

const messagesQueryKeys = {
  messages: 'messages',
  messagesThread: () => messagesQueryKeys.messages + '/thread',
  messageConversations: () => messagesQueryKeys.messages + '/conversations',
};

const getMessageThread = (recipient: string) => api.get<Message[]>(`${messagesUrl}${threadUrl}/${recipient}`);

const getMessagesForUser = () => api.get<Message[]>(`${messagesUrl}`);

const getUserConversations = () => api.get<Message[]>(`${messagesUrl}${conversationsUrl}`);

export { messagesQueryKeys, getMessageThread, getMessagesForUser, getUserConversations };
