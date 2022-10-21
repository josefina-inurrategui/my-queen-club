import styles from './modalPay.module.css';
import { useUser } from '../../context/userContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Checkout from '../MercadoPagoPayment/Checkout';

const ModalPay = ({ item , queen , price , galleryName} ) => {
    const router = useRouter()
    const {id} = router.query
    const { userData } = useUser();
    const [linkMP, setlinkMP] = useState("");

    const pedido = {price, userData , queen , galleryName , id}


    // useEffect(() => {
    //   fetch("http://localhost:8000/mercadopago/createPayment", {
    //     method: 'POST' ,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(pedido)})
    //     .then(res => res.json())
    //     .then(res => {
    //       setlinkMP(res)
    //       console.log(res)})
    // }, [id])
    

  const handleClickMercadoPago = () => {
    let pedido = {price, userData , queen , galleryName}
    fetch("http://localhost:8000/mercadopago/createPayment ", {
    method: 'POST' ,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido)})
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setlinkMP(res)
    }) 
  };

  // onClick={handleClickMercadoPago}
  return (
    <div className='container'>
      <div className={`${styles.box}`}>
        <p className={`m-0 text-center ${styles.title}`}><span>Galeria:</span> {item}</p>
        <p className={`m-0 text-center ${styles.title}`}><span>Queen:</span> {queen}</p>
        <p className={`m-0 text-center ${styles.title}`}><span>Precio:</span> $ {price}</p>
        <div className="row m-0">
          {/* <Checkout user={userData.name} id={id} galleryName={galleryName} queen={queen} price={price}>
          </Checkout> */}
            <button className='col-lg-6 col-md-6 col-12 btn '  onClick={handleClickMercadoPago}>
              <p className='text-center m-2'><i className="bi bi-credit-card fs-1"></i></p>
              <p className='text-center'>Mercado Pago</p>
            </button>

          {linkMP && <a  href={linkMP}>
            <button> IR a pagar </button>
          </a>} 
          <button className='col-lg-6 col-md-6 col-12 btn'>
            <p className='text-center m-2'><i className="bi bi-paypal fs-1"></i></p>
            <p className='text-center'>Paypal</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPay;
