import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/modules/user';
import firebase from '../../lib/firebase/firebase';
import { toggleChannelForm } from '../../redux/modules/modal';
import { ChannelForm } from '../ChannelForm';

export const SideMenu: React.VFC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isOpend, setIsOpened] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpened(!isOpend);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    router.push('/login');
    setIsOpened(false);
  };

  const openChannelForm = () => {
    dispatch(toggleChannelForm(true));
  };

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
              onClick={signOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="text-lg pb-6">
        <div className="flex items-center justify-between p-3">
          <div className="flex">
            <img src="/images/switch.svg" alt="" width="24" />
            <span>CHANNELS (0)</span>
          </div>
          <button type="button" onClick={openChannelForm}>
            <img
              src="/images/plus.svg"
              alt=""
              width="24"
              className="w-6 rounded-full hover:bg-pink-800"
            />
          </button>
        </div>
        <ul className="flex flex-col justify-center">
          <li>
            <button
              type="button"
              className="w-full px-3 py-1 text-left hover:bg-pink-800">
              # Channel1
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full px-3 py-1 text-left hover:bg-pink-800">
              # Channel2
            </button>
          </li>
        </ul>
      </div>
      <ChannelForm />
    </section>
  );
};