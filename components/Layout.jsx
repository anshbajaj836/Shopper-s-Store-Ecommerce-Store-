import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

// this page will basically help in making out the layout of the webpage
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Shopper's Stop</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout