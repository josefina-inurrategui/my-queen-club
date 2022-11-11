import Head from 'next/head';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import CardGallery from '../../components/CardGallery/CardGallery';
import jwtDecode from 'jwt-decode';
import styles from '../../styles/Galleries.module.css';
import data from '../../data/galleries.example.json';

const Galleries = ({ galerias }) => {
    
  const token=localStorage.getItem('accessToken')
  const role=jwtDecode(token).role
   


  return (
    <div className={styles.bgHome}>
      <Head>
        <title>My Queens Club - Enjoy The Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ModalSingIn idModal='singIn' />
        <h5 className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}>Galerias</h5>
      </header>

      <main className='mb-5 container-fluid'>
        <section className='row gx-0'>
          {
            galerias.map((info, index) => (
              <div key={index} className='col-6 col-md-4 col-lg-3l'>
                <CardGallery role={role}  {...info} gallery />
              </div>
            ))
          }
        </section>
      </main>

      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios('https://backqueens-production.up.railway.app/galleries');
  const galerias = await res.data;
  return {
    props: { galerias }, // will be passed to the page component as props
  };
}
export default Galleries;
