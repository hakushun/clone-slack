import React from 'react';
import { withAuth } from '../../helpers/withAuth';
import { Messages } from '../Messages';
import { MetaInfo } from '../MetaInfo';
import { SideMenu } from '../SideMenu';

export const Component: React.VFC = () => (
  <div id="app" className="grid grid-cols-5 h-screen flex-auto">
    <SideMenu />
    <Messages />
    <MetaInfo />
  </div>
);

export const App = withAuth(Component);
