import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel } from '../../redux/modules/channel';
import {
  selectUploadMediaForm,
  toggleUploadMediaForm,
} from '../../redux/modules/modal';
import { Overlay } from '../Overlay';
import {
  getDownloadURL,
  uploadMediaToStorage,
} from '../../lib/firebase/storage';
import { selectUser } from '../../redux/modules/user';
import { generateMessage, messagesRef } from '../../lib/firebase/database';

export const UploadMediaForm: React.VFC = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(selectUploadMediaForm);
  const user = useSelector(selectUser);
  const currentChannel = useSelector(selectChannel);
  const [media, setMedia] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!media) return;
    e.preventDefault();

    try {
      const uploadTask = await uploadMediaToStorage(media);
      const downloadURL = await getDownloadURL(uploadTask);
      const message = generateMessage(user, { imageURL: downloadURL });
      await messagesRef.child(currentChannel.id).push().set(message);
    } catch (error) {
      console.log(error);
    } finally {
      setMedia(null);
      dispatch(toggleUploadMediaForm(false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setMedia(file);
  };

  const closeForm = () => {
    dispatch(toggleUploadMediaForm(false));
    setMedia(null);
  };

  return (
    <>
      {isOpened && (
        <Overlay>
          <div className="w-full max-w-lg bg-white rounded-lg relative px-6 py-4">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  <h2 className="text-xl md:text-2xl font-bold">
                    Upload Media
                  </h2>
                </legend>
                <div className="mt-4">
                  <input
                    id="media"
                    name="media"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="media"
                    className="flex items-center w-full p-3 rounded cursor-pointer bg-green-100 hover:bg-green-400 focus:bg-green-400">
                    <img
                      src="/images/clip.svg"
                      alt=""
                      width="24"
                      height="24"
                      className="mr-3 w-6 h-6"
                    />
                    <span className="flex-auto">
                      {media ? media.name : 'No file selected'}
                    </span>
                  </label>
                </div>
              </fieldset>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={!media}
                  className="px-4 py-1 bg-green-500 border-2 border-green-500 rounded-xl text-lg shadow hover:bg-green-400 active:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-gray-500">
                  Upload
                </button>
              </div>
            </form>
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
