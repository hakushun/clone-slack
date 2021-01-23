import firebase from './firebase';

export const usersRef = firebase.database().ref('users');
export const channelsRef = firebase.database().ref('channels');

export const createUser = async (
  userCredential: firebase.auth.UserCredential,
): Promise<void> => {
  if (!userCredential.user) throw new Error('failure to create user');
  await usersRef.child(userCredential.user.uid).set({
    name: userCredential.user.displayName,
    avatar: userCredential.user.photoURL,
  });
};
