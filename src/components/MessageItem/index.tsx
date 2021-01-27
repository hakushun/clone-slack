import React from 'react';
import { useMessage } from '../../hooks/useMessage';
import { useUser } from '../../hooks/useUser';
import { getTimeFromNow } from '../../lib/date';
import { Message } from '../../redux/modules/messages';

type Props = {
  messages: Message[];
};
export const MessageItem: React.VFC<Props> = ({ messages }) => {
  const { currentUser } = useUser();
  const { removeMessage } = useMessage();

  return (
    <>
      {messages.map((message) => (
        <li key={message.timestamp} className="relative flex mt-3 first:m-0">
          <img
            src={message.user.avatarURL}
            alt="your avatar"
            width="36"
            height="36"
            className="w-9 h-9 mt-1 mr-3 rounded"
          />
          <div className="flex-auto">
            <div>
              <span className="text-lg font-bold">{message.user.username}</span>
              <span className="ml-3 text-sm text-gray-500">
                {getTimeFromNow(message.timestamp)}
              </span>
            </div>
            <div>
              {message.content || <img src={message.imageURL} alt="" />}
            </div>
          </div>
          {currentUser.id === message.user.id && (
            <button
              type="button"
              onClick={() => removeMessage(message.id)}
              className="absolute top-1 right-1 ml-auto inline-block p-1">
              <img
                src="/images/trash.svg"
                alt="delete message"
                width="16"
                className="w-4"
              />
            </button>
          )}
        </li>
      ))}
    </>
  );
};
