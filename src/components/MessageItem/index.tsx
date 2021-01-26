import React from 'react';
import { getTimeFromNow } from '../../lib/date';
import { Message } from '../../redux/modules/message';

type Props = {
  messages: Message[];
};
export const MessageItem: React.VFC<Props> = ({ messages }) => (
  <>
    {messages.map((message) => (
      <li key={message.timestamp} className="flex mt-3 first:m-0">
        <img
          src={message.user.avatarURL}
          alt="your avatar"
          width="36"
          height="36"
          className="w-9 h-9 mt-1 mr-3 rounded"
        />
        <div className="flex-auto">
          <span className="text-lg font-bold">{message.user.username}</span>
          <span className="ml-3 text-sm text-gray-500">
            {getTimeFromNow(message.timestamp)}
          </span>
          <div>{message.content || <img src={message.imageURL} alt="" />}</div>
        </div>
      </li>
    ))}
  </>
);
