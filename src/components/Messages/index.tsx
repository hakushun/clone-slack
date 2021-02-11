import React from 'react';
import clsx from 'clsx';
import { MessageForm } from '../MessageForm';
import { MessageList } from '../MessageList';
import { MessagesHeader } from '../MessagesHeader';
import { useChannel } from '../../hooks/useChannel';
import { useToggleUI } from '../../hooks/useToggleUI';

export const Messages: React.VFC = () => {
  const { currentChannel } = useChannel();
  const { metaInfoIsOpened } = useToggleUI();

  return (
    <section
      className={clsx(
        'bg-gray-200 flex flex-col h-screen p-3 gap-4',
        metaInfoIsOpened ? 'col-span-3' : 'col-span-4',
      )}>
      {!currentChannel.id ? (
        <div className="flex items-center justify-center flex-auto bg-gray-50 rounded shadow-md border border-gray-200 px-3 py-5">
          <div className="text-4xl font-bold">Select a Channel</div>
        </div>
      ) : (
        <>
          <MessagesHeader />
          <MessageList />
          <MessageForm />
        </>
      )}
    </section>
  );
};
