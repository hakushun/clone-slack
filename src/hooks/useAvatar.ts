import { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../lib/firebase/firebase';
import { usersRef } from '../lib/firebase/database';
import { storageRef } from '../lib/firebase/storage';
import {
  selectChangeAvatarForm,
  toggleChangeAvatarForm,
} from '../redux/modules/modal';
import { selectCurrentUser } from '../redux/modules/users';

type UseAvatarType = () => {
  isOpened: boolean;
  image: File | null;
  croppedImage: string;
  setEditorRef: (_avatar: AvatarEditor) => void;
  handleChangeImage: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCropImage: () => void;
  changeAvatar: (_e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  openChangeAvatarForm: () => void;
  closeChangeAvatarForm: () => void;
};
export const useAvatar: UseAvatarType = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isOpened = useSelector(selectChangeAvatarForm);
  const [image, setImage] = useState<File | null>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>('');
  const [blob, setBlob] = useState<Blob | null>(null);

  const setEditorRef = (avatar: AvatarEditor) => setEditor(avatar);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
  };

  const handleCropImage = () => {
    if (editor) {
      editor.getImageScaledToCanvas().toBlob((blb) => {
        setCroppedImage(URL.createObjectURL(blb));
        setBlob(blb);
      });
    }
  };

  const changeAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!image) return;
    e.preventDefault();
    try {
      const snapshot = await storageRef
        .child(`avatars/users/${currentUser.id}`)
        .put(blob!, {
          contentType: 'image/jpeg',
        });
      const downloadURL = (await snapshot.ref.getDownloadURL()) as string;
      await firebase.auth().currentUser?.updateProfile({
        photoURL: downloadURL,
      });
      await usersRef.child(currentUser.id).update({ avatarURL: downloadURL });
      dispatch(toggleChangeAvatarForm(false));
    } catch (error) {
      console.log(error);
    }
  };

  const openChangeAvatarForm = () => {
    dispatch(toggleChangeAvatarForm(true));
  };

  const closeChangeAvatarForm = () => {
    dispatch(toggleChangeAvatarForm(false));
  };

  return {
    isOpened,
    image,
    croppedImage,
    setEditorRef,
    handleChangeImage,
    handleCropImage,
    changeAvatar,
    openChangeAvatarForm,
    closeChangeAvatarForm,
  };
};
