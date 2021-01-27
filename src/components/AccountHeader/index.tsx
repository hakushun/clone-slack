import React from 'react';
import { useUser } from '../../hooks/useUser';

type Props = {
  toggleMenu: () => void;
};
export const AccountHeader: React.VFC<Props> = ({ toggleMenu }) => {
  const { currentUser } = useUser();

  return (
    <button
      className="w-full flex items-center justify-center px-3 py-3 border-b border-white"
      onClick={toggleMenu}>
      <img
        src={currentUser.avatarURL}
        alt="your avatar"
        width="32"
        className="mr-2 w-8 rounded-full"
      />
      <span className="text-2xl">{currentUser.username}</span>
      <img
        src="/images/chevron-down.svg"
        alt=""
        width="16"
        className="w-4 ml-2"
      />
    </button>
  );
};
