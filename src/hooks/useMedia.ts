import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import { messagesRef, privateMessagesRef } from '../lib/firebase/database';
import { selectChannel, selectIsPrivate } from '../redux/modules/channel';
import {
  selectUploadMediaForm,
  toggleUploadMediaForm,
} from '../redux/modules/modal';
import { selectUser } from '../redux/modules/user';
import { useMessage } from './useMessage';
import { storageRef } from '../lib/firebase/storage';
import firebase from '../lib/firebase/firebase';

type UseMediaType = () => {
  media: File | null;
  isLoading: boolean;
  isOpened: boolean;
  handleChangeMedia: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  createMessageWithMedia: (
    _e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  openUploadMediaForm: () => void;
  closeUploadMediaForm: () => void;
};

export const useMedia: UseMediaType = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectChannel);
  const isPrivate = useSelector(selectIsPrivate);
  const currentUser = useSelector(selectUser);
  const isOpened = useSelector(selectUploadMediaForm);
  const [media, setMedia] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { generateMessage } = useMessage();

  const ref = isPrivate ? privateMessagesRef : messagesRef;

  const handleChangeMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setMedia(file);
  };

  const getContentType = (filename: string): string =>
    mime.lookup(filename) || '';

  const getMetadata = (filename: string): firebase.storage.UploadMetadata => ({
    contentType: getContentType(filename),
  });

  const getExtention = (filename: string): string => {
    const splittedFilename = filename.split('.');
    return splittedFilename[splittedFilename.length - 1];
  };

  const getUploadFilePath = (filename: string): string =>
    isPrivate
      ? `chat/private/${currentChannel.id}/${uuidv4()}.${getExtention(
          filename,
        )}`
      : `chat/public/${uuidv4()}.${getExtention(filename)}`;

  const uploadMediaToStorage = async (
    file: File,
  ): Promise<firebase.storage.UploadTaskSnapshot> => {
    const filePath = getUploadFilePath(file.name);
    const metadata = getMetadata(file.name);
    const result = await storageRef.child(filePath).put(file, metadata);
    return result;
  };

  const getDownloadURL = async (
    uploadTask: firebase.storage.UploadTaskSnapshot,
  ): Promise<string> => {
    const result = (await uploadTask.ref.getDownloadURL()) as string;
    return result;
  };

  const createMessageWithMedia = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    if (!media) return;
    e.preventDefault();
    setIsLoading(true);
    try {
      const uploadTask = await uploadMediaToStorage(media);
      const downloadURL = await getDownloadURL(uploadTask);
      const message = generateMessage(currentUser, { imageURL: downloadURL });
      await ref.child(currentChannel.id).child(message.id).set(message);
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
    createMessageWithMedia,
    openUploadMediaForm,
    closeUploadMediaForm,
  };
};
