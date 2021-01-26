import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel } from '../../redux/modules/channel';
import { selectJoinedUsers } from '../../redux/modules/messages';
import { searchMessage } from '../../redux/modules/search';

export const MessagesHeader: React.VFC = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const joinedUsers = useSelector(selectJoinedUsers);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchMessage({ search: e.target.value }));
  };

  const countJointedUsers = (): string => {
    if (joinedUsers.length === 1) return '1 User';
    return `${joinedUsers.length} Users`;
  };

  return (
    <div className="flex items-center justify-between py-3 px-5 rounded shadow-md border border-gray-200 bg-white">
      <div className="flex-auto">
        <h2 className="text-2xl">
          <strong>{currentChannel.name}</strong>
        </h2>
        <span className="text-sm text-gray-600">{countJointedUsers()}</span>
      </div>
      <div>
        <div className="flex items-center border border-gray-500 rounded focus-within:ring-blue-500 focus-within:ring-1">
          <img
            src="/images/search.svg"
            alt=""
            width="24"
            className="w-6 ml-2"
          />
          <input
            type="text"
            name="search"
            placeholder="Search Messages"
            onChange={handleChange}
            className="flex-auto text-md py-1 px-2 outline-none rounded"
          />
        </div>
      </div>
    </div>
  );
};
