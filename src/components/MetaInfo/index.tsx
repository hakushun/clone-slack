import React from 'react';
import { useChannel } from '../../hooks/useChannel';
import { useToggleUI } from '../../hooks/useToggleUI';
import { MetaInfoAbout } from '../MetaInfoAbout';
import { MetaInfoHeader } from '../MetaInfoHeader';
import { MetaInfoMembers } from '../MetaInfoMembers';

export const MetaInfo: React.VFC = () => {
  const { metaInfoIsOpened, handleToggleDrawer } = useToggleUI();
  const { isPrivate } = useChannel();

  return (
    <>
      {metaInfoIsOpened && (
        <aside className="relative overflow-y-auto">
          <MetaInfoHeader />
          {!isPrivate && <MetaInfoAbout />}
          <MetaInfoMembers />
          <button
            type="button"
            className="absolute top-6 right-3"
            onClick={handleToggleDrawer}>
            <img src="/images/x.svg" alt="close metainfo" width="28" />
          </button>
        </aside>
      )}
    </>
  );
};
