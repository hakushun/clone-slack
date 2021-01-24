import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesRef } from '../../lib/firebase/database';
import { selectChannel } from '../../redux/modules/channel';
import { Message } from '../../redux/modules/message';
import { selectMessages, setMessages } from '../../redux/modules/messages';
import { MessageItem } from '../MessageItem';

export const MessageList: React.VFC = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const messages = useSelector(selectMessages);

  useEffect(() => {
    if (currentChannel.id) {
      messagesRef.child(currentChannel.id).on('value', (snapshots) => {
        const loadedMessages: Message[] = [];
        snapshots.forEach((snapshot) => {
          loadedMessages.push(snapshot.val());
        });
        dispatch(setMessages(loadedMessages));
      });
    }
    return () => {
      messagesRef.off();
    };
  }, [currentChannel.id, dispatch]);

  return (
    <div className="flex-auto overflow-y-scroll bg-gray-100 rounded shadow-md border border-gray-200 px-3 py-5">
      <ul>
        <MessageItem messages={messages} />
      </ul>
    </div>
  );
};
