import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
  composeValidators,
  isEmail,
  isRequired,
} from '../../../lib/validations';
import firebase from '../../../lib/firebase/firebase';

export const Login: React.VFC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (values: any) => {
    setIsLoading(true);
    const { email, password } = values;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      router.push('/');
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <section id="login">
      <Form
        onSubmit={handleOnSubmit}
        initialValues={{}}
        subscription={{ pristine: true }}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <h2>Login for Clone-Slack</h2>
              </legend>
              <div>
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
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        placeholder="Email Address"
                        required
                        aria-required
                        disabled={isLoading}
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  validate={isRequired('Password')}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}>
                  {({ input, meta }) => (
                    <>
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        placeholder="Password"
                        required
                        aria-required
                        autoComplete="new-password"
                        minLength={6}
                        maxLength={50}
                        disabled={isLoading}
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </>
                  )}
                </Field>
              </div>
            </fieldset>
            <div>
              <button type="submit" disabled={isLoading || pristine}>
                Login
              </button>
            </div>
          </form>
        )}
      />
      <div>
        <div>
          Don&apos;t have an account{' '}
          <Link href="/register">
            <a>Register Now</a>
          </Link>
        </div>
      </div>
    </section>
  );
};
