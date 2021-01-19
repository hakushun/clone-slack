import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import md5 from 'md5';
import {
  composeValidators,
  isEmail,
  isRequired,
  minValue,
  mxaValue,
} from '../../../lib/validations';
import firebase from '../../../lib/firebase/firebase';

export const Register: React.VFC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (values: any) => {
    setIsLoading(true)
    const { username, email, password } = values;

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!createdUser.user) throw new Error();

      await createdUser.user.updateProfile({
        displayName: username,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.uid,
        )}?d=identicon`,
      });

      await firebase.database().ref('users').child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
      });
      router.push('/');
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <section id="register" className="w-full h-screen px-4 flex flex-col justify-center items-center">
      <Form
        onSubmit={handleOnSubmit}
        initialValues={{}}
        subscription={{ pristine: true }}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit} className="px-10 md:px-20 py-5 bg-white rounded shadow">
            <fieldset>
              <legend>
                <h2 className="py-3 text-2xl">Register for Clone-Slack</h2>
              </legend>
              <div className="flex flex-col">
                <Field
                  type="text"
                  name="username"
                  validate={composeValidators(
                    isRequired('User name'),
                    minValue(2),
                    mxaValue(50),
                  )}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}>
                  {({ input, meta }) => (
                    <>
                      <label htmlFor="username" className="text-lg">User name</label>
                      <input
                        id="username"
                        placeholder="User name"
                        required
                        aria-required
                        minLength={2}
                        maxLength={50}
                        disabled={isLoading}
                        className="text-lg"
                        {...input}
                      />
                      <div className="h-7">
                        {meta.error && meta.touched && <span className="text-lg text-red-500">{meta.error}</span>}
                      </div>
                    </>
                  )}
                </Field>
              </div>
              <div className="flex flex-col">
                <Field
                  type="text"
                  name="email"
                  validate={composeValidators(
                    isRequired('Email Address'),
                    isEmail,
                  )}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}>
                  {({ input, meta }) => (
                    <>
                      <label htmlFor="email" className="text-lg">Email</label>
                      <input
                        id="email"
                        placeholder="Email Address"
                        required
                        aria-required
                        disabled={isLoading}
                        className="text-lg"
                        {...input}
                      />
                      <div className="h-7">
                        {meta.error && meta.touched && <span className="text-lg text-red-500">{meta.error}</span>}
                      </div>                    </>
                  )}
                </Field>
              </div>
              <div className="flex flex-col">
                <Field
                  type="password"
                  name="password"
                  validate={composeValidators(
                    isRequired('Password'),
                    minValue(6),
                    mxaValue(50),
                  )}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}>
                  {({ input, meta }) => (
                    <>
                      <label htmlFor="password" className="text-lg">Password</label>
                      <input
                        id="password"
                        placeholder="Password"
                        required
                        aria-required
                        autoComplete="new-password"
                        minLength={6}
                        maxLength={50}
                        disabled={isLoading}
                        className="text-lg"
                        {...input}
                      />
                      <div className="h-7">
                        {meta.error && meta.touched && <span className="text-lg text-red-500">{meta.error}</span>}
                      </div>                    </>
                  )}
                </Field>
              </div>
            </fieldset>
            <div className="flex justify-center">
              <button type="submit" disabled={isLoading || pristine}>
                Register
              </button>
            </div>
          </form>
        )}
      />
      <div className="mt-10 px-10 md:px-20 py-5 bg-white rounded shadow">
        <div>
          Already registered?{' '}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </section>
  );
};
