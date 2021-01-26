import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/modules/users';

export const DirectMessagesHeader: React.VFC = () => {
  const users = useSelector(selectUsers);

  return (
    <div className="flex items-center p-3">
      <img src="/images/mail.svg" alt="" width="24" className="w-6 mr-2" />
      <span>DIRECT MESSAGES ({users.length})</span>
    </div>
  );
};
