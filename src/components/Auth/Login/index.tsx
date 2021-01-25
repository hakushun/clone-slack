import Link from 'next/link';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { useAuth } from '../../../hooks/useAuth';
import {
  composeValidators,
  isEmail,
  isRequired,
} from '../../../lib/validations';

export type LoginPayload = {
  email: string;
  password: string;
};
export const Login: React.VFC = () => {
  const { isLoading, signIn } = useAuth();

  const handleOnSubmit = async (values: LoginPayload) => {
    await signIn(values);
  };

  return (
    <section
      id="login"
      className="w-full h-screen px-4 flex flex-col justify-center items-center bg-purple-100">
      <Form
        onSubmit={handleOnSubmit}
        initialValues={{}}
        subscription={{ pristine: true }}
        render={({ handleSubmit, pristine }) => (
          <form
            onSubmit={handleSubmit}
            className="px-10 md:px-20 py-7 bg-white rounded shadow-md">
            <fieldset>
              <legend>
                <h2 className="py-4 text-2xl md:text-3xl">
                  Login for Clone-Slack
                </h2>
              </legend>
              <div className="flex flex-col">
                <Field
                  type="email"
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
                      <label htmlFor="email" className="text-xl">
                        Email
                      </label>
                      <input
                        id="email"
                        placeholder="Email Address"
                        required
                        aria-required
                        disabled={isLoading}
                        className="text-lg py-1 px-2 border-2 border-purple-400 rounded"
                        {...input}
                      />
                      <div className="h-7">
                        {meta.error && meta.touched && (
                          <span className="text-lg text-red-500">
                            {meta.error}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </Field>
              </div>
              <div className="flex flex-col">
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
                      <label htmlFor="password" className="text-xl">
                        Password
                      </label>
                      <input
                        id="password"
                        placeholder="Password"
                        required
                        aria-required
                        autoComplete="new-password"
                        minLength={6}
                        maxLength={50}
                        disabled={isLoading}
                        className="text-lg py-1 px-2 border-2 border-purple-400 rounded"
                        {...input}
                      />
                      <div className="h-7">
                        {meta.error && meta.touched && (
                          <span className="text-lg text-red-500">
                            {meta.error}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </Field>
              </div>
            </fieldset>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                disabled={isLoading || pristine}
                className="px-8 py-2 bg-purple-200 border-2 border-purple-200 rounded-xl text-xl hover:bg-purple-400 shadow disabled:cursor-not-allowed active:bg-purple-500">
                Login
              </button>
            </div>
          </form>
        )}
      />
      <div className="mt-10 px-4 md:px-20 py-5 bg-white rounded shadow-md">
        <div className="text-lg">
          Don&apos;t have an account?{' '}
          <Link href="/register">
            <a className="text-blue-600 underline hover:no-underline">
              Register Now
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
