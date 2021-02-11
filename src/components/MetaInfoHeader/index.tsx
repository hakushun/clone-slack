import React from 'react';
import { useChannel } from '../../hooks/useChannel';

export const MetaInfoHeader: React.VFC = () => {
  const { currentChannel } = useChannel();

  return (
    <div className="p-3 border-b border-gray-400">
      <div className="text-xl">Details</div>
      <div className="text-sm text-gray-600">{currentChannel.name}</div>
    </div>
  );
};
