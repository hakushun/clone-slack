import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { channelsRef } from '../lib/firebase/database';
import {
  Channel,
  focusPrivateChannel,
  focusPublicChannel,
  selectChannel,
  selectIsPrivate,
} from '../redux/modules/channel';
import {
  Channels,
  selectChannels,
  setChannels,
} from '../redux/modules/channels';
import { selectJoinedUsers } from '../redux/modules/messages';
import { selectChannelForm, toggleChannelForm } from '../redux/modules/modal';
import { selectUser } from '../redux/modules/user';
import { UserInfo } from '../redux/modules/users';

type ChannelFormType = {
  name: string;
  description: string;
};
type UserChannelType = () => {
  currentChannel: Channel;
  channels: Channels;
  isOpened: boolean;
  isPrivate: boolean;
  isLoading: boolean;
  openChannelForm: () => void;
  closeChannelForm: () => void;
  handleFocusPublicChannel: (_channel: Channel) => void;
  handleFocusPrivateChannel: (_user: UserInfo) => void;
  createChannel: (_values: ChannelFormType) => Promise<void>;
  countJointedUsers: () => string;
};

export const useChannel: UserChannelType = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const currentChannel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);
  const joinedUsers = useSelector(selectJoinedUsers);
  const isOpened = useSelector(selectChannelForm);
  const isPrivate = useSelector(selectIsPrivate);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    channelsRef.on('value', (snapshots) => {
      const loadedChannels: Channels = [];
      snapshots.forEach((snapshot) => {
        loadedChannels.push(snapshot.val());
      });
      dispatch(setChannels(loadedChannels));
    });
    return () => {
      channelsRef.off();
    };
  }, [dispatch]);

  const openChannelForm = () => {
    dispatch(toggleChannelForm(true));
  };

  const closeChannelForm = () => {
    dispatch(toggleChannelForm(false));
  };

  const handleFocusPublicChannel = (channel: Channel) => {
    dispatch(focusPublicChannel(channel));
  };

  const getChannelId = (userId: string) =>
    userId < currentUser.id
      ? `${userId}/${currentUser.id}`
      : `${currentUser.id}/${userId}`;

  const handleFocusPrivateChannel = (user: UserInfo) => {
    const channel = {
      id: getChannelId(user.id),
      name: user.username,
      isPrivate: true,
    };
    dispatch(focusPrivateChannel(channel));
  };

  const createChannel = async (values: ChannelFormType) => {
    setIsLoading(true);
    const { name, description } = values;
    const { key } = channelsRef.push();

    const newChannel = {
      id: key,
      name,
      description: description || '',
      createdBy: {
        username: currentUser.username,
        avatarURL: currentUser.avatarURL,
      },
    };

    try {
      await channelsRef.child(key!).update(newChannel);
      dispatch(toggleChannelForm(false));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const countJointedUsers = (): string => {
    if (joinedUsers.length === 1) return '1 User';
    return `${joinedUsers.length} Users`;
  };

  return {
    currentChannel,
    channels,
    isOpened,
    isPrivate,
    isLoading,
    openChannelForm,
    closeChannelForm,
    handleFocusPublicChannel,
    handleFocusPrivateChannel,
    createChannel,
    countJointedUsers,
  };
};
