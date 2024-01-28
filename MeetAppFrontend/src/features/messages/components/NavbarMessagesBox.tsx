import React from 'react';
import { Message } from '@/features/messages/types';
import Avatar from '@/features/users/components/Avatar';

type Props = {
  message: Message;
};

function MessageInbox({ message }: Props) {
  return (
    <div>
      <Avatar imgUrl={message.recipientPhotoUrl} name={message.recipientUsername} />
      <div>
        <span>{message.recipientUsername}</span>
        <p>{message.content}</p>
      </div>
    </div>
  );
}

export default function NavbarMessagesBox() {
  return <div className="dropdown-content rounded-box mt-4 bg-base-100 p-2 shadow">NavbarMessagesBox</div>;
}
