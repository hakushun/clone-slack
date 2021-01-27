import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { channelsRef } from '../lib/firebase/database';
import { Channel, focusChannel, selectChannel } from '../redux/modules/channel';
import {
  Channels,
  selectChannels,
  setChannels,
} from '../redux/modules/channels';
import { selectJoinedUsers } from '../redux/modules/messages';
import { selectChannelForm, toggleChannelForm } from '../redux/modules/modal';
import { selectUser } from '../redux/modules/user';

type ChannelFormType = {
  name: string;
  description: string;
};
type UserChannelType = () => {
  currentChannel: Channel;
  channels: Channels;
  isOpened: boolean;
  isLoading: boolean;
  openChannelForm: () => void;
  closeChannelForm: () => void;
  handleFocus: (_channel: Channel) => void;
  createChannel: (_values: ChannelFormType) => Promise<void>;
  countJointedUsers: () => string;
};

export const useChannel: UserChannelType = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentChannel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);
  const joinedUsers = useSelector(selectJoinedUsers);
  const isOpened = useSelector(selectChannelForm);
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

  const handleFocus = (channel: Channel) => {
    dispatch(focusChannel(channel));
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
        username: user.username,
        avatarURL: user.avatarURL,
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
    isLoading,
    openChannelForm,
    closeChannelForm,
    handleFocus,
    createChannel,
    countJointedUsers,
  };
};
