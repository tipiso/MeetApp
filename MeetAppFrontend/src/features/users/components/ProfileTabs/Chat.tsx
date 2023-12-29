import classNames from 'classnames';
import React from 'react';

function ChatMessage() {
  const alignSelf = 'self-end';
  return (
    <div className={classNames(alignSelf)}>
      <span className="text-sm">20/08/2023 20:20</span>
      <p className="rounded-lg border-gray-200 bg-base-200 py-4 px-2 text-sm">Hi How are you?</p>
    </div>
  );
}

export default function Chat() {
  return (
    <div className="flex w-full flex-col pt-4">
      <ChatMessage />
    </div>
  );
}
