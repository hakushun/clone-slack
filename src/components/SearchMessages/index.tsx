import React from 'react';
import { useDispatch } from 'react-redux';
import { searchMessage } from '../../redux/modules/search';

export const SearchMessages: React.VFC = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchMessage({ search: e.target.value }));
  };
  return (
    <div>
      <div className="flex items-center border border-gray-500 rounded focus-within:ring-blue-500 focus-within:ring-1">
        <img
          src="/images/search.svg"
          alt=""
          width="24"
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
    </div>
  );
};
