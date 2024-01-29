import React from 'react';
import { Message } from '@/features/messages/types';
import Avatar from '@/features/users/components/Avatar';
import { useGetUserMessages } from '..';
import Loader, { LoaderSizes } from '@/components/Loader';
import { getDateAndTimeFromDate } from '@/utils/parsers';
import { useRouter } from 'next/router';
import { routes } from '@/utils/routes';
import { ProfilePageTabsKeys } from '@/utils/constants';

type Props = {
  message: Message;
  moveToChat: () => void;
};

function MessageInbox({ message, moveToChat }: Props) {
  const date = getDateAndTimeFromDate(message.messageSent);

  return (
    <li onClick={moveToChat}>
      <div className="flex items-center px-4 pb-2">
        <Avatar imgUrl={message.senderPhotoUrl} name={message.senderKnownAs} minWidth={60} width={60} height={60} />
        <div className="ml-2 min-w-0 flex-grow flex-col">
          <div className="flex items-center justify-between">
            <span className="font-bold">{message.senderKnownAs}</span>
            <span className="text-xs">{date.dateString}</span>
          </div>
          <p className="min-w-0 max-w-full truncate text-sm">{message.content}</p>
        </div>
      </div>
    </li>
  );
}

export default function NavbarMessagesBox() {
  const { isLoading, data } = useGetUserMessages();
  const router = useRouter();

  const moveToChat = (username: string) => {
    router.push(routes.userProfile.replace(':username', username) + `?openTab=${ProfilePageTabsKeys.CHAT}`);
  };

  return (
    <ul className="dropdown-content menu rounded-box z-10 mt-4 h-96 w-80 flex-nowrap overflow-auto bg-base-100 px-0 py-0 shadow">
      {isLoading && <Loader size={LoaderSizes.lg} />}
      {data && data.map((m) => <MessageInbox key={m.id} message={m} moveToChat={() => moveToChat(m.senderUsername)} />)}
    </ul>
  );
}
