import React from 'react';
import { useUser } from '../../hooks/useUser';

export const DirectMessagesHeader: React.VFC = () => {
  const { users } = useUser();

  return (
    <div className="flex items-center p-3">
      <img src="/images/mail.svg" alt="" width="24" className="w-6 mr-2" />
      <span>DIRECT MESSAGES ({users.length})</span>
    </div>
  );
};
