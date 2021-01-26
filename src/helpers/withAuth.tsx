import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../lib/firebase/firebase';
import { authUser, selectIsAuth } from '../redux/modules/user';
import { mapUserData } from '../lib/firebase/mapUserData';
import { PageLoader } from '../components/PageLoader';

export const withAuth = (Component: React.FC): React.FC => (
  props: any,
): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (usr) => {
      if (usr) {
        const userData = mapUserData(usr);
        dispatch(authUser(userData));
      } else {
        dispatch(authUser(null));
        router.push('/login');
      }
    });
    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!isAuth ? <PageLoader /> : <Component {...props} />}</>;
};
