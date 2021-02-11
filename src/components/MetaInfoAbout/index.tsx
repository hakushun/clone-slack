import React from 'react';
import { useChannel } from '../../hooks/useChannel';
import { useToggleUI } from '../../hooks/useToggleUI';

export const MetaInfoAbout: React.VFC = () => {
  const { aboutIsOpened, handleToggleAccordion } = useToggleUI();
  const { currentChannel } = useChannel();

  return (
    <div className="border-b border-gray-400 ">
      <button
        type="button"
        aria-label="show about this channel"
        onClick={() => handleToggleAccordion('about')}
        className="flex items-center justify-between w-full p-3 text-lg font-bold">
        About
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4">
          {aboutIsOpened ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          )}
        </svg>
      </button>
      {aboutIsOpened && (
        <dl className="p-3">
          <dt className="text-sm text-gray-600">Description</dt>
          <dd className="mt-1">{currentChannel.description}</dd>
          <dt className="mt-3 text-sm text-gray-600">Created By</dt>
          <dd className="flex items-center mt-1">
            <img
              src={currentChannel.createdBy?.avatarURL}
              alt="your avatar"
              width="20"
              className="mr-2 w-5 rounded-full"
            />
            <span>{currentChannel.createdBy?.username}</span>
          </dd>
        </dl>
      )}
    </div>
  );
};
