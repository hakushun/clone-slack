import React from 'react';
import { useToggleUI } from '../../hooks/useToggleUI';
import { useUser } from '../../hooks/useUser';

export const AccountHeader: React.VFC = () => {
  const { currentUser } = useUser();
  const { handleToggleDropdown } = useToggleUI();

  return (
    <button
      className="w-full flex items-center justify-center px-3 py-3 border-b border-white"
      onClick={handleToggleDropdown}>
      <img
        src={currentUser.avatarURL}
        alt="your avatar"
        width="32"
        height="32"
        className="mr-2 w-8 rounded-full"
      />
      <span className="text-2xl">{currentUser.username}</span>
      <img
        src="/images/chevron-down.svg"
        alt=""
        width="16"
        height="16"
        className="w-4 ml-2"
      />
    </button>
  );
};
