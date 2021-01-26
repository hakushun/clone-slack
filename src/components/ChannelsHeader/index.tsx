import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannels } from '../../redux/modules/channels';
import { toggleChannelForm } from '../../redux/modules/modal';

export const ChannelsHeader: React.VFC = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);

  const openChannelForm = () => {
    dispatch(toggleChannelForm(true));
  };
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex">
        <img src="/images/switch.svg" alt="" width="24" className="w-6 mr-2" />
        <span>CHANNELS ({channels.length})</span>
      </div>
      <button type="button" onClick={openChannelForm}>
        <img
          src="/images/plus.svg"
          alt=""
          width="24"
          className="w-6 rounded-full hover:bg-pink-600"
        />
      </button>
    </div>
  );
};
