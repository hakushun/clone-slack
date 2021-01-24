import React from 'react';
import { MessageForm } from '../MessageForm';
import { MessageList } from '../MessageList';
import { MessagesHeader } from '../MessagesHeader';

export const Messages: React.VFC = () => (
  <section className="bg-gray-200 col-span-3 flex flex-col h-screen p-3 gap-4">
    <MessagesHeader />
    <MessageList />
    <MessageForm />
  </section>
);
