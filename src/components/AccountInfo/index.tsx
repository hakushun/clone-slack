import React from 'react';
import { useToggleUI } from '../../hooks/useToggleUI';
import { AccountHeader } from '../AccountHeader';
import { AccountMenu } from '../AccountMenu';

export const AccountInfo: React.VFC = () => {
  const { accountMenuIsOpened } = useToggleUI();

  return (
    <div className="relative">
      <AccountHeader toggleMenu={toggleMenu} />
      {isOpend && <AccountMenu />}
    </div>
  );
};
