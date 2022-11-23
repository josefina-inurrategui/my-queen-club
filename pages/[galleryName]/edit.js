import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import Footer from '../../components/Footer/Footer';
import styles from '../../styles/Galleries.module.css';
import ModalEditGallery from '../../components/ModalEditGallery/ModalEditGallery';

import clientAxios from '../../config/clientAxios';

const Edit = () => {
  const { query, push } = useRouter();
  const nameGallery = query.galleryName;
  const [galerias, setGalerias] = useState();

  useEffect(() => {
    clientAxios('galleries/admin')
      .then(res => setGalerias(res?.data?.find((or) => or.galleryName === nameGallery)));
  }, []);

  return (
    <div className={styles.bgHome}>
      <Head>
        <title>My Queens Club - Enjoy The Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ModalSingIn idModal='singIn' />
        <h5 className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}>EDIT</h5>
      </header>
      <main>
      <ModalEditGallery galeria={galerias} />

      </main>
      <Footer />
    </div>
  );
};

export default Edit;
