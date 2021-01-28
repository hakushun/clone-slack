import React from 'react';
import clsx from 'clsx';
import { useChannel } from '../../hooks/useChannel';
import { useUser } from '../../hooks/useUser';

export const DirectMessageList: React.VFC = () => {
  const { users } = useUser();
  const { currentChannel, handleFocusPrivateChannel } = useChannel();

  return (
    <ul className="flex flex-col justify-center">
      {users.map((user) => (
        <li key={user.id}>
          <button
            type="button"
            onClick={() => handleFocusPrivateChannel(user)}
            className={clsx(
              'flex justify-between items-center w-full px-3 py-1 text-left hover:bg-pink-600',
              currentChannel.isPrivate &&
                currentChannel.name === user.username &&
                'bg-pink-700',
            )}>
            <span className="flex-auto">@ {user.username}</span>
            {user.online ? (
              <img
                src="/images/online.svg"
                alt={`${user.username} is online`}
                width="24"
                className="w-6 ml-2"
              />
            ) : (
              <img
                src="/images/offline.svg"
                alt={`${user.username} is offline`}
                width="24"
                className="w-6 ml-2"
              />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};
