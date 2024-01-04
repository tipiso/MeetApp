import { getMessageThread, messagesQueryKeys } from '@/services/messages';
import useSWR from 'swr';

const useMessageThread = (recipient: string) => {
  const fetcher = (url: string) => getMessageThread(recipient);

  const { ...rest } = useSWR(messagesQueryKeys.messagesThread, fetcher);

  return { ...rest, data: rest.data?.data };
};

export default useMessageThread;
