import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimestamp } from '../lib/date';
import { messagesRef } from '../lib/firebase/database';
import { selectChannel } from '../redux/modules/channel';
import {
  selectMessages,
  Message,
  setMessages,
  Messages,
} from '../redux/modules/messages';
import { selectUser, User } from '../redux/modules/user';

type MessageFormType = {
  message: string;
};
type MessageValueType = { imageURL: string } | { content: string };
type UseMessageType = () => {
  messages: Messages;
  isLoading: boolean;
  generateMessage: (_user: User, _value: MessageValueType) => Message;
  createMessage: (_values: MessageFormType) => Promise<void>;
  removeMessage: (_id: string) => void;
};

export const useMessage: UseMessageType = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const messages = useSelector(selectMessages);
  const currentUser = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const generateMessage = (user: User, value: MessageValueType): Message => {
    const message = {
      id: '',
      timestamp: getTimestamp(),
      user: {
        id: user.id,
        username: user.username,
        avatarURL: user.avatarURL,
      },
      ...value,
    };
    return message;
  };

  const createMessage = async (values: MessageFormType) => {
    setIsLoading(true);
    const message = generateMessage(currentUser, { content: values.message });

    try {
      const key = messagesRef.child(currentChannel.id).push().key as string;
      await messagesRef
        .child(currentChannel.id)
        .child(key)
        .set({ ...message, id: key });
      values.message = '';
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeMessage = (id: string) => {
    try {
      messagesRef.child(currentChannel.id).child(id).remove();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    messages,
    isLoading,
    generateMessage,
    createMessage,
    removeMessage,
  };
};
