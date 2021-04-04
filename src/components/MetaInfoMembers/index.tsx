import React from 'react';
import { useChannel } from '../../hooks/useChannel';
import { useToggleUI } from '../../hooks/useToggleUI';

export const MetaInfoMembers: React.VFC = () => {
  const { membersIsOpened, handleToggleAccordion } = useToggleUI();
  const { joinedUsers } = useChannel();

  return (
    <div className="border-b border-gray-400">
      <button
        type="button"
        aria-label="show members in this channel"
        onClick={() => handleToggleAccordion('members')}
        className="flex items-center justify-between w-full p-3 text-lg font-bold">
        Members
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4">
          {membersIsOpened ? (
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
      {membersIsOpened && (
        <ul className="p-3">
          {joinedUsers.map((user) => (
            <li key={user.id} className="flex items-center mt-2  first:m-0">
              <img
                src={user.avatarURL}
                alt="your avatar"
                width="20"
                height="20"
                className="mr-2 w-5 rounded-full"
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
