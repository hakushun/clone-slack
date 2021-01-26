import clsx from 'clsx';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { generateMessage, messagesRef } from '../../lib/firebase/database';
import { isRequired } from '../../lib/validations';
import { selectChannel } from '../../redux/modules/channel';
import { toggleUploadMediaForm } from '../../redux/modules/modal';
import { selectUser } from '../../redux/modules/user';
import { UploadMediaForm } from '../UploadMediaForm';

type MessageFormType = {
  message: string;
};
export const MessageForm: React.VFC = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openUploadMediaForm = () => {
    dispatch(toggleUploadMediaForm(true));
  };

  const handleOnSubmit = async (values: MessageFormType) => {
    setIsLoading(true);
    const message = generateMessage(user, { content: values.message });

    try {
      const key = messagesRef.child(currentChannel.id).push().key as string;
      await messagesRef
        .child(currentChannel.id)
        .child(key)
        .set({ ...message, id: key });
      values.message = '';
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded shadow-md border border-gray-200 px-3 py-5">
      <Form
        onSubmit={handleOnSubmit}
        initialValues={{ message: '' }}
        subscription={{ pristine: true }}
        render={({ handleSubmit, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Field
              type="text"
              name="message"
              validate={isRequired('Message')}
              subscription={{
                value: true,
                active: true,
                error: true,
                touched: true,
              }}>
              {({ input, meta }) => (
                <div className="flex items-center gap-1">
                  <button type="button" className="p-1.5">
                    <img
                      src="/images/emoji.svg"
                      alt="add emoji on message"
                      width="24"
                      height="24"
                      className="w-6 h-6"
                    />
                  </button>
                  <input
                    placeholder={`Message #${currentChannel.name}`}
                    autoComplete="off"
                    required
                    aria-required
                    disabled={isLoading}
                    className={clsx(
                      'flex-auto text-lg py-1 px-2 rounded outline-none focus:ring-blue-500 focus:ring-2',
                      meta.touched && meta.error && 'ring-2 ring-red-500',
                    )}
                    {...input}
                  />
                </div>
              )}
            </Field>
            <div className="flex mt-4 gap-1">
              <button
                type="submit"
                disabled={isLoading || pristine}
                className="flex flex-auto p-2 rounded bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-gray-500">
                <img
                  src="/images/pencil.svg"
                  alt=""
                  width="24"
                  className="w-6"
                />
                <span className="flex-auto text-white font-bold">
                  Send Message
                </span>
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={openUploadMediaForm}
                className="flex flex-auto p-2 rounded bg-green-600">
                <span className="flex-auto text-white font-bold">
                  Upload Media
                </span>
                <img
                  src="/images/cloud-upload.svg"
                  alt=""
                  width="24"
                  className="w-6"
                />
              </button>
            </div>
          </form>
        )}
      />
      <UploadMediaForm />
    </div>
  );
};
