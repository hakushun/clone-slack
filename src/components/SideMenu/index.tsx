import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChannelForm } from '../ChannelForm';
import {
  Channels as TypeChannels,
  setChannels,
} from '../../redux/modules/channels';
import { channelsRef } from '../../lib/firebase/database';
import { SideMenuHeader } from '../SideMenuHeader';
import { Channels } from '../Channels';
import { AccountInfo } from '../AccountInfo';

export const SideMenu: React.VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    channelsRef.on('value', (snapshots) => {
      const loadedChannels: TypeChannels = [];
      snapshots.forEach((snapshot) => {
        loadedChannels.push(snapshot.val());
      });
      dispatch(setChannels(loadedChannels));
    });
    return () => {
      channelsRef.off();
    };
  }, [dispatch]);

  return (
    <section className="bg-pink-900 text-white">
      <SideMenuHeader />
      <AccountInfo />
      <Channels />
      <ChannelForm />
    </section>
  );
};
