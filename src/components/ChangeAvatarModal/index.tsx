import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useAvatar } from '../../hooks/useAvatar';
import { Overlay } from '../Overlay';

export const ChangeAvatarModal: React.VFC = () => {
  const {
    image,
    croppedImage,
    setEditorRef,
    handleChangeImage,
    changeAvatar,
    closeChangeAvatarForm,
    handleCropImage,
  } = useAvatar();

  return (
    <Overlay>
      <div className="w-full max-w-lg bg-white rounded-lg relative px-6 py-4">
        <form onSubmit={changeAvatar}>
          <fieldset>
            <legend>
              <h2 className="text-xl md:text-2xl font-bold">Change Avatar</h2>
            </legend>
            <div className="mt-4">
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="flex items-center w-full p-3 rounded cursor-pointer bg-green-100 hover:bg-green-400 focus:bg-green-400">
                <img
                  src="/images/clip.svg"
                  alt=""
                  width="24"
                  height="24"
                  className="mr-3 w-6 h-6"
                />
                <span className="flex-auto">
                  {image ? image.name : 'No file selected'}
                </span>
              </label>
            </div>
          </fieldset>
          <div className="flex items-center justify-around mt-5">
            <div>
              <AvatarEditor
                ref={setEditorRef}
                image={image || ''}
                width={120}
                height={120}
                border={50}
                scale={1.2}
                onImageReady={handleCropImage}
                onImageChange={handleCropImage}
                onPositionChange={handleCropImage}
              />
            </div>
            <div className="flex items-center justify-center w-28 h-28">
              {croppedImage && (
                <img
                  src={croppedImage}
                  alt="preview your avatar"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!image}
              className="px-4 py-1 bg-green-500 border-2 border-green-500 rounded-xl text-lg shadow hover:bg-green-400 active:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-gray-500">
              Change Avatar
            </button>
          </div>
        </form>
        <button
          type="button"
          onClick={closeChangeAvatarForm}
          className="absolute top-3 right-3">
          <img src="/images/x.svg" alt="close modal" width="28" height="28" />
        </button>
      </div>
    </Overlay>
  );
};
