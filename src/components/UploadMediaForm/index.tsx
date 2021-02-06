import React from 'react';
import { Overlay } from '../Overlay';
import { useMedia } from '../../hooks/useMedia';

export const UploadMediaForm: React.VFC = () => {
  const {
    media,
    isOpened,
    handleChangeMedia,
    createMessageWithMedia,
    closeUploadMediaForm,
  } = useMedia();

  return (
    <>
      {isOpened && (
        <Overlay>
          <div className="w-full max-w-lg bg-white rounded-lg relative px-6 py-4">
            <form onSubmit={createMessageWithMedia}>
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
                    onChange={handleChangeMedia}
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
              onClick={closeUploadMediaForm}
              className="absolute top-3 right-3">
              <img src="/images/x.svg" alt="close modal" width="28" />
            </button>
          </div>
        </Overlay>
      )}
    </>
  );
};
