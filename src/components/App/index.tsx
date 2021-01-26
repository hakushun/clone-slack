import React from 'react';
import { withAuth } from '../../helpers/withAuth';
import { ColorPanel } from '../ColorPanel';
import { Messages } from '../Messages';
import { MetaInfo } from '../MetaInfo';
import { SideMenu } from '../SideMenu';

export const Component: React.VFC = () => (
  <div id="app" className="flex">
    <ColorPanel />
    <div className="grid grid-cols-5 h-screen flex-auto">
      <SideMenu />
      <Messages />
      <MetaInfo />
    </div>
  </div>
);

export const App = withAuth(Component);
