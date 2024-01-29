import { Message } from '@/features/messages/types';
import { api } from '@/utils/axios';
import { messagesUrl, threadUrl } from '@/utils/url';

const messagesQueryKeys = {
  messages: 'messages',
  messagesThread: () => messagesQueryKeys.messages + '/thread',
};

const getMessageThread = (recipient: string) => api.get<Message[]>(`${messagesUrl}${threadUrl}/${recipient}`);

const getMessagesForUser = () => api.get<Message[]>(`${messagesUrl}`);

export { messagesQueryKeys, getMessageThread, getMessagesForUser };
