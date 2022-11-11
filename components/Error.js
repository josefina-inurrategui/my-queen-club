import React from 'react';
import Image from 'next/image';

const Error = ({texto,number}) => {
  return (
    <section className='d-flex flex-column align-items-center justify-content-center'
     style={{ height: '100vh', backgroundColor: '#050914', color: '#ffff' }}>

      <h1 style={{ color: '#D44F81' }}>ERROR {number&&number}</h1>

      <h2>{texto}</h2>

      <Image width={147.6} height={61} src='/images/logo.png' alt='logo' quality={100}
      />
    </section>

  );
};

export default Error;
