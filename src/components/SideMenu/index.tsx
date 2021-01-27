import React from 'react';
import { ChannelForm } from '../ChannelForm';
import { SideMenuHeader } from '../SideMenuHeader';
import { Channels } from '../Channels';
import { AccountInfo } from '../AccountInfo';
import { DirectMessages } from '../DirectMessages';

export const SideMenu: React.VFC = () => (
  <section className="bg-pink-900 text-white">
    <SideMenuHeader />
    <AccountInfo />
    <Channels />
    <ChannelForm />
    <DirectMessages />
  </section>
);
