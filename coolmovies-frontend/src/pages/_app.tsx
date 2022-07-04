import React, { FC, useState, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { EnhancedStore } from '@reduxjs/toolkit';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { createStore } from '../redux';
import { theme } from '../utils/theme';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [apolloClient, setApolloClient] = useState<any>();
  const [store, setStore] = useState<EnhancedStore | null>(null);

  useEffect(() => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.API_URL,
    });

    setApolloClient(client);

    const store = createStore({
      epicDependencies: { client },
    });
    setStore(store);
  }, []);

  if (!store) return <>{'Loading...'}</>;

  return (
    <>
      <Head>
        <title>{'Coolmovies Frontend'}</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ReduxProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
