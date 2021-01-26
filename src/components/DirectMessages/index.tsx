import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectedRef,
  presenceRef,
  usersRef,
} from '../../lib/firebase/database';
import { setPresences } from '../../redux/modules/presences';
import { selectUser } from '../../redux/modules/user';
import { setUsers, UserInfo } from '../../redux/modules/users';
import { DirectMessageList } from '../DirectMessageList';
import { DirectMessagesHeader } from '../DirectMessagesHeader';

export const DirectMessages: React.VFC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    usersRef.on('value', (snapshots) => {
      const loadedUsers: UserInfo[] = [];
      snapshots.forEach((snapshot) => {
        loadedUsers.push(snapshot.val());
      });
      dispatch(setUsers(loadedUsers));
    });
    connectedRef.on('value', (snapshot) => {
      if (snapshot.val() === true) {
        const ref = presenceRef.child(currentUser.id);
        ref.set(true);
        ref.onDisconnect().remove();
      }
    });
    presenceRef.on('value', (snapshots) => {
      dispatch(setPresences(snapshots.val()));
    });
    return () => {
      usersRef.off();
      connectedRef.off();
      presenceRef.off();
    };
  }, [dispatch, currentUser.id]);

  return (
    <div className="pb-6">
      <DirectMessagesHeader />
      <DirectMessageList />
    </div>
  );
};
