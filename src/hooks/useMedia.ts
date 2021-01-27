import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesRef } from '../lib/firebase/database';
import { uploadMediaToStorage, getDownloadURL } from '../lib/firebase/storage';
import { selectChannel } from '../redux/modules/channel';
import {
  selectUploadMediaForm,
  toggleUploadMediaForm,
} from '../redux/modules/modal';
import { selectUser } from '../redux/modules/user';
import { useMessage } from './useMessage';

type UseMediaType = () => {
  media: File | null;
  isLoading: boolean;
  isOpened: boolean;
  handleChangeMedia: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  createMessagewithMedia: (
    _e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  openUploadMediaForm: () => void;
  closeUploadMediaForm: () => void;
};

export const useMedia: UseMediaType = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const currentUser = useSelector(selectUser);
  const isOpened = useSelector(selectUploadMediaForm);
  const [media, setMedia] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { generateMessage } = useMessage();

  const handleChangeMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setMedia(file);
  };

  const createMessagewithMedia = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    if (!media) return;
    e.preventDefault();
    setIsLoading(true);
    try {
      const uploadTask = await uploadMediaToStorage(media);
      const downloadURL = await getDownloadURL(uploadTask);
      const message = generateMessage(currentUser, { imageURL: downloadURL });
      await messagesRef.child(currentChannel.id).push().set(message);
    } catch (error) {
      console.log(error);
    } finally {
      setMedia(null);
      dispatch(toggleUploadMediaForm(false));
      setIsLoading(false);
    }
  };

  const openUploadMediaForm = () => {
    dispatch(toggleUploadMediaForm(true));
  };

  const closeUploadMediaForm = () => {
    dispatch(toggleUploadMediaForm(false));
    setMedia(null);
  };

  return {
    media,
    isLoading,
    isOpened,
    handleChangeMedia,
    createMessagewithMedia,
    openUploadMediaForm,
    closeUploadMediaForm,
  };
};
