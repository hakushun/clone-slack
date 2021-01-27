import { Message } from '../../redux/modules/messages';
import { User } from '../../redux/modules/user';
import { getTimestamp } from '../date';
import firebase from './firebase';

export const usersRef = firebase.database().ref('users');
export const channelsRef = firebase.database().ref('channels');
export const messagesRef = firebase.database().ref('messages');
export const presenceRef = firebase.database().ref('presence');

export const connectedRef = firebase.database().ref('.info/connected');

type MessageValueType = { imageURL: string } | { content: string };
export const generateMessage = (
  user: User,
  value: MessageValueType,
): Message => {
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
