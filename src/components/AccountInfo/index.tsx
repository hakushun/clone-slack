import React from 'react';
import { useAvatar } from '../../hooks/useAvatar';
import { useToggleUI } from '../../hooks/useToggleUI';
import { AccountHeader } from '../AccountHeader';
import { AccountMenu } from '../AccountMenu';
import { ChangeAvatarModal } from '../ChangeAvatarModal';

export const AccountInfo: React.VFC = () => {
  const { accountMenuIsOpened } = useToggleUI();
  const { isOpened } = useAvatar();

  return (
    <div className="relative">
      <AccountHeader />
      {accountMenuIsOpened && <AccountMenu />}
      {isOpened && <ChangeAvatarModal />}
    </div>
  );
};
