import React from 'react';

export const SideMenuHeader: React.VFC = () => (
  <div className="flex items-center justify-center px-3 py-5 border-b border-white">
    <img
      src="/images/code.svg"
      alt=""
      width="36"
      height="36"
      className="mr-2 w-9"
    />
    <h1 className="text-3xl font-bold">もくもく</h1>
  </div>
);
