import React, { useState } from 'react';
import { AccountHeader } from '../AccountHeader';
import { AccountMenu } from '../AccountMenu';

export const AccountInfo: React.VFC = () => {
  const [isOpend, setIsOpened] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpened(!isOpend);
  };

  return (
    <div className="relative">
      <AccountHeader toggleMenu={toggleMenu} />
      {isOpend && <AccountMenu />}
    </div>
  );
};
