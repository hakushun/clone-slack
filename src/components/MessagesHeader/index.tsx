import React from 'react';
import { useSelector } from 'react-redux';
import { selectChannel } from '../../redux/modules/channel';

export const MessagesHeader: React.VFC = () => {
  const currentChannel = useSelector(selectChannel);

  return (
    <div className="flex items-center justify-between py-3 px-5 rounded shadow-md border border-gray-200 bg-white">
      <div className="flex-auto">
        <h2 className="text-2xl">
          <strong>{currentChannel.name}</strong>
        </h2>
        <span className="text-sm text-gray-600">Number Users</span>
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
            className="flex-auto text-md py-1 px-2 outline-none rounded"
          />
        </div>
      </div>
    </div>
  );
};
