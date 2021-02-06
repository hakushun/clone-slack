import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChannel } from '../../hooks/useChannel';
import { selectMetaInfo, toggleMetaInfo } from '../../redux/modules/drawer';

export const MessagesHeaderInfo: React.VFC = () => {
  const { currentChannel, isPrivate, countJointedUsers } = useChannel();
  const dispatch = useDispatch();
  const metaInfoIsOpened = useSelector(selectMetaInfo);

  const handleToggleDrawer = () => {
    dispatch(toggleMetaInfo(!metaInfoIsOpened));
  };

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
