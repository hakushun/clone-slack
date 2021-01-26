import React from 'react';
import { ChannelList } from '../ChannelList';
import { ChannelsHeader } from '../ChannelsHeader';

export const Channels: React.VFC = () => (
  <div className="pb-6">
    <ChannelsHeader />
    <ChannelList />
  </div>
);
