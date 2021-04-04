import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import { useToggleUI } from '../../hooks/useToggleUI';

export const SearchMessages: React.VFC = () => {
  const { handleToggleDrawer } = useToggleUI();
  const { handleChange } = useSearch();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-gray-500 rounded focus-within:ring-blue-500 focus-within:ring-1">
        <img
          src="/images/search.svg"
          alt=""
          width="24"
          height="24"
          className="w-6 ml-2 bg-white"
        />
        <input
          type="text"
          name="search"
          placeholder="Search Messages"
          onChange={handleChange}
          className="flex-auto text-md py-1 px-2 outline-none rounded"
        />
      </div>
      <button type="button" onClick={handleToggleDrawer}>
        <img
          src="/images/info.svg"
          alt=""
          width="28"
          height="28"
          className="w-7"
        />
      </button>
    </div>
  );
};
