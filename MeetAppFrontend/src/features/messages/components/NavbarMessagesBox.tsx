import React from 'react';
import { Message } from '@/features/messages/types';
import Avatar from '@/features/users/components/Avatar';
import { useGetUserMessages } from '..';
import Loader, { LoaderSizes } from '@/components/Loader';

type Props = {
  message: Message;
};

function MessageInbox({ message }: Props) {
  return (
    <li>
      <div className="flex items-center px-4 pb-2">
        <Avatar imgUrl={message.senderPhotoUrl} name={message.recipientUsername} minWidth={60} width={60} height={60} />
        <div className="ml-2 min-w-0 flex-col">
          <span className="font-bold">{message.senderUsername}</span>
          <p className="min-w-0 max-w-full truncate text-sm">{message.content}</p>
        </div>
      </div>
    </li>
  );
}

export default function NavbarMessagesBox() {
  const { isLoading, data } = useGetUserMessages();

  return (
    <ul className="dropdown-content menu rounded-box z-10 mt-4 h-96 w-80 bg-base-100 px-0 pt-0 shadow">
      {isLoading && <Loader size={LoaderSizes.lg} />}
      {data && data.map((m) => <MessageInbox message={m} />)}
    </ul>
  );
}
