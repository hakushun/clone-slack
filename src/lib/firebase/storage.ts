import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import firebase from './firebase';

export const storageRef = firebase.storage().ref();

const getContentType = (filename: string): string =>
  mime.lookup(filename) || '';

export const getMetadata = (
  filename: string,
): firebase.storage.UploadMetadata => ({
  contentType: getContentType(filename),
});

const getExtention = (filename: string): string => {
  const splittedFilename = filename.split('.');
  return splittedFilename[splittedFilename.length - 1];
};

export const getUploadFilePath = (filename: string): string =>
  `chat/public/${uuidv4()}.${getExtention(filename)}`;

export const uploadMediaToStorage = async (
  media: File,
): Promise<firebase.storage.UploadTaskSnapshot> => {
  const filePath = getUploadFilePath(media.name);
  const metadata = getMetadata(media.name);
  const result = await storageRef.child(filePath).put(media, metadata);
  return result;
};

export const getDownloadURL = async (
  uploadTask: firebase.storage.UploadTaskSnapshot,
): Promise<string> => {
  const result = (await uploadTask.ref.getDownloadURL()) as string;
  return result;
};
