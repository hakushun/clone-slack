import React from 'react';
import { useMessage } from '../../hooks/useMessage';
import { MessageItem } from '../MessageItem';

export const MessageList: React.VFC = () => {
  const { messages } = useMessage();

  return (
    <div className="flex-auto overflow-y-scroll bg-gray-50 rounded shadow-md border border-gray-200 px-3 py-5">
      <ul>
        <MessageItem messages={messages} />
      </ul>
    </div>
  );
};
