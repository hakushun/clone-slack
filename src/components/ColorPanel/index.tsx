import React from 'react';

export const ColorPanel: React.VFC = () => (
  <section className="bg-black bg-opacity-80 w-14 flex-none">
    <div className="flex flex-col justify-center py-5 px-3">
      <button className="flex justify-center items-center w-full p-1 rounded-md bg-blue-500">
        <img src="/images/plus.svg" alt="add" width="30" />
      </button>
    </div>
  </section>
);
