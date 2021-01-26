import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChannel,
  Channel,
  focusChannel,
} from '../../redux/modules/channel';
import { selectChannels } from '../../redux/modules/channels';
import { toggleChannelForm } from '../../redux/modules/modal';

export const ChannelList: React.VFC = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);

  const openChannelForm = () => {
    dispatch(toggleChannelForm(true));
  };

  const handleFocus = (channel: Channel) => {
    dispatch(focusChannel(channel));
  };

  return (
    <div className="text-lg pb-6">
      <div className="flex items-center justify-between p-3">
        <div className="flex">
          <img src="/images/switch.svg" alt="" width="24" />
          <span>CHANNELS ({channels.length})</span>
        </div>
        <button type="button" onClick={openChannelForm}>
          <img
            src="/images/plus.svg"
            alt=""
            width="24"
            className="w-6 rounded-full hover:bg-pink-600"
          />
        </button>
      </div>
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
    </div>
  );
};
