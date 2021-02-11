import React from 'react';
import { useChannel } from '../../hooks/useChannel';
import { useToggleUI } from '../../hooks/useToggleUI';

export const MessagesHeaderInfo: React.VFC = () => {
  const { currentChannel, isPrivate, countJointedUsers } = useChannel();
  const { handleToggleDrawer } = useToggleUI();

  return (
    <div className="flex-auto">
      <h2 className="text-2xl">
        <button type="button" onClick={handleToggleDrawer}>
          <strong>
            {isPrivate ? '@' : '#'} {currentChannel.name}
          </strong>
        </button>
      </h2>
      <span className="text-sm text-gray-600">{countJointedUsers()}</span>
    </div>
  );
};
