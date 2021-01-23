import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  selectChannelForm,
  toggleChannelForm,
} from '../../redux/modules/modal';
import { Overlay } from '../Overlay';
import {
  composeValidators,
  isRequired,
  minValue,
  mxaValue,
} from '../../lib/validations';
import { selectUser } from '../../redux/modules/user';
import firebase from '../../lib/firebase/firebase';

type ChannelFormType = {
  name: string;
  description: string;
};

export const ChannelForm: React.VFC = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(selectChannelForm);
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (values: ChannelFormType) => {
    setIsLoading(true);
    const { name, description } = values;
    const { key } = firebase.database().ref('channels').push();

    const newChannel = {
      id: key,
      name,
      description: description || '',
      createdBy: {
        username: user.username,
        avatarURL: user.avatarURL,
      },
    };

    try {
      await firebase.database().ref('channels').child(key!).update(newChannel);
      dispatch(toggleChannelForm(false));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const closeForm = () => {
    dispatch(toggleChannelForm(false));
  };

  return (
    <>
      {isOpened && (
        <Overlay>
          <div className="w-full max-w-lg bg-white rounded-lg relative px-6 py-4">
            <Form
              onSubmit={handleOnSubmit}
              initialValues={{}}
              subscription={{ pristine: true }}
              render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <legend>
                      <h2 className="text-xl md:text-2xl font-bold">
                        Create a channel
                      </h2>
                    </legend>
                    <Field
                      type="text"
                      name="name"
                      validate={composeValidators(
                        isRequired(''),
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
                        <div className="flex flex-col mt-4">
                          <label
                            htmlFor="channel_name"
                            className="flex flex-wrap">
                            <strong>Name</strong>
                            {meta.touched && meta.error && (
                              <span
                                role="alert"
                                id="error_channel_name"
                                className="flex-auto ml-2 text-red-600">
                                {meta.error}
                              </span>
                            )}
                          </label>
                          <div className="flex items-center border border-gray-500 rounded focus-within:ring-blue-500 focus-within:ring-1">
                            <span className="text-lg py-1 ml-2">#</span>
                            <input
                              id="channel_name"
                              placeholder="e.g. dev-mokumoku"
                              aria-describedby="error_channel_name"
                              autoComplete="off"
                              required
                              aria-required
                              minLength={2}
                              disabled={isLoading}
                              className="flex-auto text-lg py-1 px-2 outline-none rounded"
                              {...input}
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                    <Field
                      type="text"
                      name="description"
                      validate={mxaValue(100)}
                      subscription={{
                        value: true,
                        active: true,
                        error: true,
                        touched: true,
                      }}>
                      {({ input, meta }) => (
                        <div className="flex flex-col mt-4">
                          <label
                            htmlFor="channel_description"
                            className="flex flex-wrap">
                            <strong>Description</strong>
                            <span>(optional)</span>
                            {meta.touched && meta.error && (
                              <span
                                role="alert"
                                id="error_channel_description"
                                className="flex-auto ml-2 text-red-600">
                                {meta.error}
                              </span>
                            )}
                          </label>
                          <input
                            id="channel_description"
                            aria-describedby="error_channel_description"
                            autoComplete="off"
                            disabled={isLoading}
                            className="text-lg py-1 px-2 border border-gray-500 rounded outline-none focus:ring-blue-500 focus:ring-1"
                            {...input}
                          />
                          <div className="text-sm">
                            What’s this channel about?
                          </div>
                        </div>
                      )}
                    </Field>
                  </fieldset>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading || pristine}
                      className="px-4 py-1 bg-green-500 border-2 border-green-500 rounded-xl text-lg shadow hover:bg-green-400 active:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-gray-500">
                      Create
                    </button>
                  </div>
                </form>
              )}
            />
            <button
              type="button"
              onClick={closeForm}
              className="absolute top-3 right-3">
              <img src="/images/x.svg" alt="close modal" width="28" />
            </button>
          </div>
        </Overlay>
      )}
    </>
  );
};
