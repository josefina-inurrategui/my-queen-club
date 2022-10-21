import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { UserProvider } from '../context/userContext';
import { getState } from '../ipState/ipState';
import Loader from '../components/Loader/LoaderInit'
import Error from '../components/Error';

const MyApp = ({ Component, pageProps }) => {
  const [isScreenShoot, setIsScreenShoot] = useState(false);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(true);
 
  const handleKeyDown = (e) => {
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

    getState()
      .then(res => {
        setLocation(res.state);
        setStatus(false);
      })
      .catch(err => {
        console.log(err)
      }
      )
  }, [])
     
  

  useEffect(() => {
    document.oncontextmenu = () => false;
    document.oncut = () => false;
    document.oncopy = () => false;
    document.onpaste = () => false;
    document.ondrag = () => false;
    document.ondrop = () => false;
  });
  
  if (location === process.env.NEXT_PUBLIC_STATE ) return <Error />


  return (
    <>
    { status ? <Loader/>
      : 
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
}
    </>


  );




};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
