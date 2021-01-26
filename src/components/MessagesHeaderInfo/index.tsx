import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel } from '../../redux/modules/channel';
import { selectMetaInfo, toggleMetaInfo } from '../../redux/modules/drawer';
import { selectJoinedUsers } from '../../redux/modules/messages';

export const MessagesHeaderInfo: React.VFC = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const joinedUsers = useSelector(selectJoinedUsers);
  const metaInfoIsOpened = useSelector(selectMetaInfo);

  const handleToggleDrawer = () => {
    dispatch(toggleMetaInfo(!metaInfoIsOpened));
  };

  const countJointedUsers = (): string => {
    if (joinedUsers.length === 1) return '1 User';
    return `${joinedUsers.length} Users`;
  };
  return (
    <div className="flex-auto">
      <h2 className="text-2xl">
        <button type="button" onClick={handleToggleDrawer}>
          <strong># {currentChannel.name}</strong>
        </button>
      </h2>
      <span className="text-sm text-gray-600">{countJointedUsers()}</span>
    </div>
  );
};
