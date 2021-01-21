import React from 'react';
import { withAuth } from '../../helpers/withAuth';
import { SideMenu } from '../SideMenu';

export const Component: React.VFC = () => (
  <div id="app" className="grid grid-cols-5 h-screen">
    <SideMenu />
    <section className="bg-gray-100 col-span-3">Messages</section>
    <aside className="bg-blue-100">Meta</aside>
  </div>
);

export const App = withAuth(Component);
