import Head from 'next/head';
import { useState } from 'react';
import NewQueen from '../../components/NewQueen/NewQueen';
import NewGallery from '../../components/NewGallery/NewGallery';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import styles from '../../styles/Home.module.css';
import CarouselPhoto from '../../components/CarouselPhoto/CarouselPhoto';
import UserViewer from '../../components/UsersViewer/UserViewer';

const Admin = () => {
  const [queen, setQueen] = useState(false);
  return (
    <div>
      <Head>
        <title>My Queens Club - Enjoy The Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ModalSingIn idModal='singIn'/>
      </header>

      <main className={`p-md-5 ${styles.bgHome} d-flex justify-content-center align-items-center flex-wrap`}>
        <NewQueen setQueen={setQueen} />
        <CarouselPhoto />
        <NewGallery queenSelect={queen} />
        <UserViewer />
      </main>

    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();

  return {
    props: { data },
  };
}

export default Admin;