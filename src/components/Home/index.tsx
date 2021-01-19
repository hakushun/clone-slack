import React from 'react';
import { withAuth } from '../../helpers/withAuth';

export const Component: React.VFC = () => <div>Home</div>;

export const Home = withAuth(Component);
