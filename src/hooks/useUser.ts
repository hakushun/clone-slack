import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectedRef, presenceRef, usersRef } from '../lib/firebase/database';
import { selectIsAuth, User } from '../redux/modules/user';
import firebase from '../lib/firebase/firebase';
import {
  selectCurrentUser,
  selectUsers,
  setUsers,
  UserInfo,
} from '../redux/modules/users';
import { setPresences } from '../redux/modules/presences';

type UseUserType = () => {
  currentUser: UserInfo | User;
  users: UserInfo[];
  createUser: (_userCredential: firebase.auth.UserCredential) => Promise<void>;
};

export const useUser: UseUserType = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuth = useSelector(selectIsAuth);
  const users = useSelector(selectUsers);

  useEffect(() => {
    if (isAuth) {
      usersRef.on('value', (snapshots) => {
        const loadedUsers: UserInfo[] = [];
        snapshots.forEach((snapshot) => {
          loadedUsers.push(snapshot.val());
        });
        dispatch(setUsers(loadedUsers));
      });
      connectedRef.on('value', (snapshot) => {
        if (snapshot.val() === true) {
          const ref = presenceRef.child(currentUser!.id);
          ref.set(true);
          ref.onDisconnect().remove();
        }
      });
      presenceRef.on('value', (snapshots) => {
        dispatch(setPresences(snapshots.val()));
      });
    }

    return () => {
      usersRef.off();
      connectedRef.off();
      presenceRef.off();
    };
  }, [dispatch, currentUser, isAuth]);

  const createUser = async (
    userCredential: firebase.auth.UserCredential,
  ): Promise<void> => {
    if (!userCredential.user) throw new Error('failure to create user');

    try {
      await usersRef.child(userCredential.user.uid).set({
        id: userCredential.user.uid,
        username: userCredential.user.displayName,
        avatarURL: userCredential.user.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { currentUser, users, createUser };
};
