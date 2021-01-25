import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectUser } from '../../redux/modules/user';
import { useAuth } from '../../hooks/useAuth';
import { toggleChannelForm } from '../../redux/modules/modal';
import { ChannelForm } from '../ChannelForm';
import {
  Channels,
  selectChannels,
  setChannels,
} from '../../redux/modules/channels';
import {
  Channel,
  focusChannel,
  selectChannel,
} from '../../redux/modules/channel';
import { channelsRef } from '../../lib/firebase/database';

export const SideMenu: React.VFC = () => {
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const user = useSelector(selectUser);
  const currentChannel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);
  const [isOpend, setIsOpened] = useState<boolean>(false);

  const handleFocus = (channel: Channel) => {
    dispatch(focusChannel(channel));
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpened(false);
  };

  const toggleMenu = () => {
    setIsOpened(!isOpend);
  };

  const openChannelForm = () => {
    dispatch(toggleChannelForm(true));
  };

  useEffect(() => {
    channelsRef.on('value', (snapshots) => {
      const loadedChannels: Channels = [];
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
      <div className="flex items-center justify-center px-3 py-5 border-b border-white">
        <img src="/images/code.svg" alt="" width="36" className="mr-2 w-9" />
        <h1 className="text-3xl font-bold">もくもく</h1>
      </div>

      <div className="relative">
        <button
          className="w-full flex items-center justify-center px-3 py-3 border-b border-white"
          onClick={toggleMenu}>
          <img
            src={user.avatarURL}
            alt="your avatar"
            width="32"
            className="mr-2 w-8 rounded-full"
          />
          <span className="text-2xl">{user.username}</span>
          <img
            src="/images/chevron-down.svg"
            alt=""
            width="16"
            className="w-4 ml-2"
          />
        </button>
        {isOpend && (
          <div className="absolute flex flex-col justify-center w-full py-2 px-3 rounded-xl bg-white text-gray-900">
            <span className="py-2 text-center">
              Signed in as <strong>{user.username}</strong>
            </span>
            <button
              type="button"
              className="py-2 rounded hover:bg-gray-300 focus:bg-gray-300">
              Change Avatar
            </button>
            <button
              type="button"
              className="py-2 rounded hover:bg-gray-300 focus:bg-gray-300"
              onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

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
      <ChannelForm />
    </section>
  );
};
