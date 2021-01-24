import React from 'react';
import { withAuth } from '../../helpers/withAuth';
import { ColorPanel } from '../ColorPanel';
import { Messages } from '../Messages';
import { SideMenu } from '../SideMenu';

export const Component: React.VFC = () => (
  <div id="app" className="flex">
    <ColorPanel />
    <div className="grid grid-cols-5 h-screen flex-auto">
      <SideMenu />
      <Messages />
      <aside className="bg-blue-100">Meta</aside>
    </div>
  </div>
);

export const App = withAuth(Component);
