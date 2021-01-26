import React from 'react';
import { MessagesHeaderInfo } from '../MessagesHeaderInfo';
import { SearchMessages } from '../SearchMessages';

export const MessagesHeader: React.VFC = () => (
  <div className="flex items-center justify-between py-3 px-5 rounded shadow-md border border-gray-200 bg-gray-50">
    <MessagesHeaderInfo />
    <SearchMessages />
  </div>
);
