import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectMetaInfo } from '../../redux/modules/drawer';
import { MessageForm } from '../MessageForm';
import { MessageList } from '../MessageList';
import { MessagesHeader } from '../MessagesHeader';

export const Messages: React.VFC = () => {
  const metaInfoIsOpened = useSelector(selectMetaInfo);

  return (
    <section
      className={clsx(
        'bg-gray-200 flex flex-col h-screen p-3 gap-4',
        metaInfoIsOpened ? 'col-span-3' : 'col-span-4',
      )}>
      <MessagesHeader />
      <MessageList />
      <MessageForm />
    </section>
  );
};
