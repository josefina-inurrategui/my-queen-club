import styles from './modalPay.module.css';
import { useUser } from '../../context/userContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { GetLocalStorage } from '../../helper/GetLocalStorage';
import BtnPaypal from '../../components/Paypal/btnPaypal';

const ModalPay = ({ item , queen , price , galleryName} ) => {
    const router = useRouter()
    const {id} = router.query
    const { userData } = useUser();
    const [linkMP, setlinkMP] = useState("");
    const [buttonPayPal, setButtonPayPal] = useState(false);
    const token = GetLocalStorage('accessToken');
    const pedido = {price, userData , queen , galleryName , id}


  const handleClickMercadoPago = () => {
    let pedido = {price, userData , queen , galleryName}
    fetch("http://localhost:8000/mercadopago/createPayment ", {
    method: 'POST' ,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        accessToken: token,
    },
    body: JSON.stringify(pedido)})
    .then(res => res.json())
    .then(res => {
      setButtonPayPal(false)
      setlinkMP(res)
    }) 
  };
  const handlePayPal = () =>{
    setlinkMP("")
    setButtonPayPal(true)
  }
  return (
    <div className='container'>
      <div className={`${styles.box}`}>
        <p className={`m-0 text-center ${styles.title}`}><span>Galeria:</span> {item}</p>
        <p className={`m-0 text-center ${styles.title}`}><span>Queen:</span> {queen}</p>
        <p className={`m-0 text-center ${styles.title}`}><span>Precio:</span> $ {price}</p>
        <div className="row m-0">
          <button className='col-lg-6 col-md-6 col-12 btn' onClick={handlePayPal}>
            <p className='text-center m-2'><i className="bi bi-paypal fs-1"></i></p>
            <p className='text-center'>Paypal</p>
          </button>
          <button className='col-lg-6 col-md-6 col-12 btn '  onClick={handleClickMercadoPago}>
            <p className='text-center m-2'><i className="bi bi-credit-card fs-1"></i></p>
            <p className='text-center'>Mercado Pago</p>
          </button>
        </div>
        <div className='text-center'>
        {linkMP ? <a href={linkMP}><button className={`${styles.buttonMP}`}> Pagar </button></a> : buttonPayPal ? <BtnPaypal price={price}/>: ""} 
        </div> 
      </div>
    </div>
  );
};

export default ModalPay;
