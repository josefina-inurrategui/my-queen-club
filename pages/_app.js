import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { UserProvider } from '../context/userContext';

const MyApp = ({ Component, pageProps }) => {
  const [isScreenShoot, setIsScreenShoot] = useState(false);

  const handleKeyDown = (e) => {
    // console.log(e);
    if (e.code === 'ShiftLeft') {
      setIsScreenShoot(true);
    }
  };

  const handleKeyUp = () => {
    setTimeout(() => {
      setIsScreenShoot(false);
    }, 1000);
  };

  useEffect(() => {
    document.oncontextmenu = () => false;
    document.oncut = () => false;
    document.oncopy = () => false;
    document.onpaste = () => false;
    document.ondrag = () => false;
    document.ondrop = () => false;
  });

  return (
    <UserProvider>
      <div onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} tabIndex={-1}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"
          />

        <div className={`bg-dark vh-100 ${isScreenShoot ? 'd-block' : 'd-none'}`} />
          <Navbar />
          <Component {...pageProps} />
      </div>
    </UserProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
