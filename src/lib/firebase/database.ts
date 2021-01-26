import { Message } from '../../redux/modules/message';
import { User } from '../../redux/modules/user';
import { getTimestamp } from '../date';
import firebase from './firebase';

export const usersRef = firebase.database().ref('users');
export const channelsRef = firebase.database().ref('channels');
export const messagesRef = firebase.database().ref('messages');

export const createUser = async (
  userCredential: firebase.auth.UserCredential,
): Promise<void> => {
  if (!userCredential.user) throw new Error('failure to create user');
  await usersRef.child(userCredential.user.uid).set({
    id: userCredential.user.uid,
    username: userCredential.user.displayName,
    avatarURL: userCredential.user.photoURL,
  });
};

type MessageValueType = { imageURL: string } | { content: string };
export const generateMessage = (
  user: User,
  value: MessageValueType,
): Message => {
  const message = {
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
