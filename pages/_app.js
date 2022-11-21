import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar/Navbar';
import { UserProvider, useUser } from '../context/userContext';
import { getState } from '../ipState/ipState';
import Loader from '../components/Loader/LoaderInit';
import Error from '../components/Error';
import Msginitial from '../components/MsgInitial/msginitial';
import AlertSecurity from '../components/Alert/AlertSecurity';
import jwtDecode from 'jwt-decode';
import axios from 'axios';


const MyApp = ({ Component, pageProps }) => {
  const [isScreenShoot, setIsScreenShoot] = useState(false);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(true);
  const [role, setRole] = useState(undefined)
  /* const token = localStorage.getItem('accessToken')
  const role = jwtDecode(token).role

 console.log(role) */

  const handleKeyDown = (e) => {
    if (e.code === 'ShiftLeft') {
      setIsScreenShoot(true);
    }
  };

  function lockoutAlert(icon_alert, title_alert, text_alert) {
    Swal.fire({
      icon: icon_alert,
      title: title_alert,
      text: text_alert,
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'popup-class',
        confirmButton: 'btn-ok',
      },
      width: 680,
    });
  }

  function optionsToDisable(e) {
    if ((e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.key === 'P')) { // Bloqueo de impresiones --> Comando Ctrl+P
      lockoutAlert('error', 'Esta sección no se permite imprimir o exportar en PDF', 'Solicitamos no intentarlo de nuevo.');
      e.preventDefault();
    } else if (e.metaKey && e.shiftKey) { // Se sobrepone pantalla ante recorte del Sistema Operativo Windows --> Comando Windows+Shift+S
      Swal.fire({
        icon: 'warning',
        title: 'Recortes de pantalla detectados!',
        text: 'Solicitamos no intentarlo de nuevo.',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        grow: 'fullscreen',
      });
    } else if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'C')) { // Bloqueo de copiado --> Comando Ctrl+C
      lockoutAlert('error', 'Esta sección no se permite copiar', 'Solicitamos no intentarlo de nuevo.');
      e.preventDefault();
    } else if ((e.ctrlKey && e.key === 'x') || ((e.ctrlKey && e.key === 'X'))) { // Bloqueo de cortado --> Comando Ctrl+X
      lockoutAlert('error', 'Esta sección no se permite cortar', 'Solicitamos no intentarlo de nuevo.');
      e.preventDefault();
    }
  }


  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') { // Deshabilita captura de pantalla --> Tecla (imp pnt)
        navigator.clipboard.writeText(' ');
        lockoutAlert('error', 'Capturas de pantalla deshabilitadas!', 'Solicitamos no intentarlo de nuevo.');
      }
    });
    document.addEventListener('keydown', (e) => { optionsToDisable(e); });
  }, []);

  useEffect(() => {
    getState()
      .then(res => {
        if (localStorage.length > 0) {
          const tok = localStorage.getItem('accessToken')
          if (tok !== null) {
            const data = jwtDecode(localStorage.getItem('accessToken'))
            setRole(data.role)
          }
          else {
            setRole(undefined)
          }
        }
        setLocation(res.state);
        setStatus(false);
      })
      .catch(err => {
        console.log(err, 'ERROR');
      });
  }, [])

  if (location === process.env.NEXT_PUBLIC_STATE) {
    if (role === 'client' || role === undefined) {
      return <Error texto={'Lo sentimos este contenido esta restringido para su region'} />;
    }
  }/* */

  return (
    <>
      {status ? <Loader />
        :
        <UserProvider>
          <Msginitial/>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>

          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"
          />
          <Navbar />
          <Component {...pageProps} />
        </UserProvider>}
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
