import React from 'react';
import { useSelector } from 'react-redux';
import { selectChannel } from '../../redux/modules/channel';
import { selectJoinedUsers } from '../../redux/modules/messages';

export const MessagesHeaderInfo: React.VFC = () => {
  const currentChannel = useSelector(selectChannel);
  const joinedUsers = useSelector(selectJoinedUsers);

  const countJointedUsers = (): string => {
    if (joinedUsers.length === 1) return '1 User';
    return `${joinedUsers.length} Users`;
  };
  return (
    <div className="flex-auto">
      <h2 className="text-2xl">
        <strong># {currentChannel.name}</strong>
      </h2>
      <span className="text-sm text-gray-600">{countJointedUsers()}</span>
    </div>
  );
};
