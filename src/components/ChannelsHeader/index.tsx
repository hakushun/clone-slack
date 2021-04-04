import React from 'react';
import { useChannel } from '../../hooks/useChannel';

export const ChannelsHeader: React.VFC = () => {
  const { channels, openChannelForm } = useChannel();

  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex">
        <img
          src="/images/switch.svg"
          alt=""
          width="24"
          height="24"
          className="w-6 mr-2"
        />
        <span>CHANNELS ({channels.length})</span>
      </div>
      <button type="button" onClick={openChannelForm} aria-label="add Channel">
        <img
          src="/images/plus.svg"
          alt=""
          width="24"
          height="24"
          className="w-6 rounded-full hover:bg-pink-600"
        />
      </button>
    </div>
  );
};
