import { useEffect, useState } from 'react';
import BtnPaypal from '../../components/Paypal/btnPaypal';
import clientAxios from '../../config/clientAxios';
import styles from './modalPay.module.css'

const ModalPay = ({ item , queen , price , galleryName} ) => {
    const [linkMP, setlinkMP] = useState("");
    const [buttonPayPal, setButtonPayPal] = useState(false);


    const handleClickMercadoPago = async () => {
      let pedido = {price, queen , galleryName}
      const response = await clientAxios.post('/mercadopago/createPayment', pedido);
      setButtonPayPal(false)
      setlinkMP(response.data)
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
