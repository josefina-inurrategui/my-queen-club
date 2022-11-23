import Head from 'next/head';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import styles from '../../styles/Galleries.module.css';
import data from '../../data/gallery.example.json';
import compras from '../../data/purchase.json';
import ModalPay from '../../components/ModalPay/ModalPay';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import BtnPaypal from '../../components/Paypal/btnPaypal';
import LoaderInit from '../../components/Loader/LoaderInit';
import clientAxios from '../../config/clientAxios';
import AlertSecurity from '../../components/Alert/AlertSecurity';

const Gallery = (/* { gallery, purchase } */) => {
  /* const { galleryName, queenName, images, price, imageQuantity } = gallery; */

  const [gallery, setGallery] = useState('');
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const galleriname = router.query.id;
  const token = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('user_name') || undefined;
  const user = token ? jwtDecode(token) : false;
  const [idUser, setIdUser] = useState(user ? user.userId : 0);

  useEffect(() => {
    clientAxios(`purchase/user/${idUser}/${galleriname}`)
      .then(res => {
        setGallery(res.data);
      })
      .catch(err => Swal.fire('Intente nuevamente mastarde'));
  }, []);

  if (!gallery) return <LoaderInit />;

  return (
    <div className={styles.bgHome}>
      <Head>
        <title>My Queens Club - Enjoy The Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ModalSingIn idModal='singIn' />
        <ModalSingIn idModal='singInBuy' isLogin />
        <div className='pt-5 pb-4'>
          <h6 className={`text-uppercase fw-bolder text-center ${styles.title}`}>{gallery?.galleryName}</h6>
          <h6 className={`fw-bolder text-center mb-4 ${styles.subTitle}`}>Galería de fotos de {gallery?.idQueen}</h6>
        </div>
      </header>

      <main className='mb-5 container-fluid'>
        <section className='row gx-0'>
          {gallery?.photos ? <AlertSecurity/> : ''}
          {
            gallery?.photos
              ? gallery?.photos?.map((src, i) => (
                <div key={i} className="mb-3  col-md-3  position-relative d-flex justify-content-center">
                  <img src={src} alt={src} style={{ width: ' 90%', objectFit: 'contain' }}/* width={1000} height={1620} */ />
                </div>
              )) : <>
                {
                  gallery?.photosShow?.map((src, i) => (
                    <div key={i} className="mb-3 col-md-3 position-relative d-flex justify-content-center">
                      <img src={src} alt={src} style={{ width: '90%', objectFit: 'cover' }}/* width={1000} height={1620} */ />
                    </div>
                  ))
                }
                <div key={259} className="mb-3 col-md-3  position-relative d-flex justify-content-center">
                  <img src={gallery?.photoBlur} alt={gallery?.photoBlur} style={{ width: '90%', objectFit: 'cover' }} />
                  <div className={`position-absolute top-50 start-50 translate-middle text-center ${styles.textColor} `}>
                    <h4 className={`fw-bold text-uppercase mb-4 ${styles.contentTitle}`}>Contenido restringido</h4>
                    <p>
                      Para ver las {gallery.numberPhotos} fotos sin censura,
                      <br />
                      hacé click en el botón de abajo
                    </p>
                    <div className='my-4'>
                      <button className={`px-5 btn ${styles.button}`} data-bs-toggle="modal" data-bs-target='#modalPay'>Suscríbete</button>
                    </div>

                    <p>
                      <em>Precio final de la galería AR${gallery?.price}</em>
                    </p>
                    {
                      !token && <>
                        <p>Si ya tenes una suscripción a esta galería,
                          inicia sesión para poder visualizarla. </p>
                        <div className='my-4'>
                          <button className={`btn ${styles.outlineButton} btn-outline-dark`} data-bs-toggle="modal" data-bs-target="#singInBuy">Iniciar sesión</button>
                        </div>
                      </>
                    }

                  </div>
                  <GeneralModal id='modalPay' name="Como quieres abonar ?">
                    <ModalPay queen={gallery.idQueen} price_USD={gallery?.price_USD} price={gallery?.price} item={gallery.galleryName} galleryName={gallery.galleryName} />
                  </GeneralModal>
                </div>
              </>

          }
        </section>

      </main>

      <Footer />
    </div>
  );
};
Gallery.propTypes = {
  gallery: PropTypes.object,
};

export default Gallery;
