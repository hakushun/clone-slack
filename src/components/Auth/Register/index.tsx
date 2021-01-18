import Link from 'next/link';
import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  composeValidators,
  isEmail,
  isRequired,
  minValue,
  mxaValue,
} from '../../../lib/validations';

export const Register: React.VFC = () => {
  const handleOnSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <section>
      <Form
        onSubmit={handleOnSubmit}
        initialValues={{}}
        subscription={{ submitting: true, pristine: true }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <h2>Register for Clone-Slack</h2>
              </legend>
              <div>
                <Field
                  type="text"
                  name="username"
                  validate={composeValidators(
                    isRequired('Username'),
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
                      <label htmlFor="username">Username</label>
                      <input
                        id="username"
                        placeholder="Username"
                        required
                        aria-required
                        minLength={2}
                        maxLength={50}
                        disabled={submitting}
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </>
                  )}
                </Field>
              </div>
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
                        disabled={submitting}
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
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        placeholder="Password"
                        required
                        aria-required
                        autoComplete="new-password"
                        minLength={6}
                        maxLength={50}
                        disabled={submitting}
                        {...input}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </>
                  )}
                </Field>
              </div>
            </fieldset>
            <div>
              <button type="submit" disabled={submitting || pristine}>
                Register
              </button>
            </div>
          </form>
        )}
      />
      <div>
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
