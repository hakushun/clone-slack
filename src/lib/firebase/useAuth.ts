import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import md5 from 'md5';
import firebase from './firebase';
import { RegisterPayload } from '../../components/Auth/Register';
import { createUser } from './database';
import { LoginPayload } from '../../components/Auth/Login';
import { logoutUser } from '../../redux/modules/user';

type UseAuthType = () => {
  isLoading: boolean;
  signUp: (_values: RegisterPayload) => Promise<void>;
  signIn: (_values: LoginPayload) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuth: UseAuthType = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUp = async (values: RegisterPayload) => {
    setIsLoading(true);
    const { username, email, password } = values;

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!createdUser.user) throw new Error('failure to create user');

      await createdUser.user.updateProfile({
        displayName: username,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.uid,
        )}?d=identicon`,
      });

      await createUser(createdUser);

      router.push('/');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const signIn = async (values: LoginPayload) => {
    setIsLoading(true);
    const { email, password } = values;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push('/');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(logoutUser());
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoading, signUp, signIn, signOut };
};
