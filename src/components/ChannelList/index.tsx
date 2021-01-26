import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChannel,
  Channel,
  focusChannel,
} from '../../redux/modules/channel';
import { selectChannels } from '../../redux/modules/channels';

export const ChannelList: React.VFC = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);

  const handleFocus = (channel: Channel) => {
    dispatch(focusChannel(channel));
  };

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
