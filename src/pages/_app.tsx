import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { useStore } from '../redux/configureStore';

import '../components/stylesheets/reset.scss';
import '../components/stylesheets/global.scss';

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <div id="overlay" />
    </Provider>
  );
}
