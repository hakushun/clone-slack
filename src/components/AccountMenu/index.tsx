import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { selectUser } from '../../redux/modules/user';

export const AccountMenu: React.VFC = () => {
  const { signOut } = useAuth();
  const user = useSelector(selectUser);

  return (
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
  );
};
