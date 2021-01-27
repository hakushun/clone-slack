import clsx from 'clsx';
import React from 'react';
import { useChannel } from '../../hooks/useChannel';

export const ChannelList: React.VFC = () => {
  const { currentChannel, channels, handleFocus } = useChannel();

  return (
    <ul className="flex flex-col justify-center">
      {channels.map((channel) => (
        <li key={channel.id}>
          <button
            type="button"
            className={clsx(
              'w-full px-3 py-1 text-left hover:bg-pink-600',
              currentChannel.id === channel.id && 'bg-pink-700',
            )}
            onClick={() => handleFocus(channel)}>
            # {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
