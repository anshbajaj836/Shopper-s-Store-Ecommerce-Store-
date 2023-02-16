import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      {/* wrapping everything under statecontext is not gonna change anything, we are just passing everything through state context */}
      <Layout>
        <Toaster />
        {/* this component is a single component
        no navbar,no footer, nothing */}
        {/* this component means page you are currently on, like what page you are on */}
        <Component {...pageProps} />

        {/* now how we access this singular component in layout, it is trick, in react , that whatever we pass something inside of our component
        we can get access to that through a prop called children */}
      </Layout>
    </StateContext>
  )
}

export default MyApp
