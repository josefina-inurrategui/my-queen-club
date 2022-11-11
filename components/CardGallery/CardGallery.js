import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './cardgallery.module.css';
import ModalPay from '../ModalPay/ModalPay';


const CardGallery = ({
  coverPhotoGallery, galleryName, price, gallery, price_USD, numberPhotos, index = false, role
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/gallery/${galleryName}`);
  };



  return (
    <div className="m-1">
      <div className={styles.cardGallery} onClick={handleClick}>
        <div className='position-relative'>
          <img style={{ height: 400, width: '100%', objectFit: index ? 'cover' : 'contain' }} src={coverPhotoGallery} alt={galleryName}/*  height={1920} width={1200} layout="responsive" quality={100} priority  */ />
          <div className='text-white px-2 py-1 bg-dark bg-opacity-75 position-absolute bottom-0 end-0 d-flex'>
            <i className="bi bi-camera me-1" />
            <div className={styles.imageQuantity}>{numberPhotos}</div>
          </div>
          {role === 'admin' &&
            <>
              <button
                className='btn btn-primary position-absolute'
                style={{ right: 8, width: 40, height: 40 }}>
                <i class="bi bi-trash"></i>
              </button>
              <button
                className='btn btn-primary position-absolute'
                style={{ right: 55, width: 40, height: 40 }}>
                <i class="bi bi-pencil-square"></i>
              </button>
            </>
          }
        </div>
        <div className={`p-2 ${styles.cardBody}`}>
          {
            !gallery
              ? (
                <div className="d-flex justify-content-evenly align-items-center px-md-4">
                  <p className={`fw-normal ${styles.titleName}`}>{galleryName}</p>
                  <p className={`text-secondary fw-light ${styles.titleName}`}>{galleryName}</p>
                </div>
              )
              : (
                <>
                  <div className="d-flex justify-content-between align-items-center px-lg-4">
                    <p className={`fw-normal ${styles.titleName}`}>{galleryName}</p>
                    <p className={`fw-light text-end ${styles.priceGallery}`}>${price} |  {price_USD} USD</p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center ps-lg-4'>
                    <span className={`text-secondary fw-light ${styles.titleName}`}>{galleryName}</span>
                    <button className={`btn ${styles.button}`}>Suscribete</button>

                  </div>

                </>
              )
          }
        </div>
      </div>
    </div>
  );
};

CardGallery.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  galleryName: PropTypes.string.isRequired,
  imageQuantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  gallery: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

CardGallery.defaultProps = {
  gallery: false,
};

export default CardGallery;
