import React from 'react';
import { useSelector } from 'react-redux';
import { getTimeFromNow } from '../../lib/date';
import { messagesRef } from '../../lib/firebase/database';
import { selectChannel } from '../../redux/modules/channel';
import { Message } from '../../redux/modules/messages';
import { selectUser } from '../../redux/modules/user';

type Props = {
  messages: Message[];
};
export const MessageItem: React.VFC<Props> = ({ messages }) => {
  const currentUser = useSelector(selectUser);
  const currentChannel = useSelector(selectChannel);

  const handleRemove = (id: string) => {
    try {
      messagesRef.child(currentChannel.id).child(id).remove();
    } catch (error) {
      console.log(error);
    }
  };

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
              onClick={() => handleRemove(message.id)}
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
