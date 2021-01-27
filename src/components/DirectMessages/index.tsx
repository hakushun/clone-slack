import React from 'react';
import { DirectMessageList } from '../DirectMessageList';
import { DirectMessagesHeader } from '../DirectMessagesHeader';

export const DirectMessages: React.VFC = () => (
  <div className="pb-6">
    <DirectMessagesHeader />
    <DirectMessageList />
  </div>
);
