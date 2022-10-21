import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from './cardgallery.module.css';

const CardGallery = ({
  src, title, alt, galleryName, imageQuantity, price, gallery, id,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/gallery/${id}`);
  };

  return (
    <div className="m-1">
      <div className={styles.cardGallery} onClick={handleClick}>
        <div className='position-relative'>
          <Image src={src} alt={alt} height={1920} width={1200} layout="responsive" quality={100} priority />
          <div className='text-white px-2 py-1 bg-dark bg-opacity-75 position-absolute bottom-0 end-0 d-flex'>
            <i className="bi bi-camera me-1" />
            <div className={styles.imageQuantity}>{imageQuantity}</div>
          </div>
        </div>
        <div className={`p-2 ${styles.cardBody}`}>
          {
            !gallery
              ? (
                <div className="d-flex justify-content-evenly align-items-center px-md-4">
                  <p className={`fw-normal ${styles.titleName}`}>{galleryName}</p>
                  <p className={`text-secondary fw-light ${styles.titleName}`}>{title}</p>
                </div>
              )
              : (
                <>
                  <div className="d-flex justify-content-between align-items-center px-lg-4">
                    <p className={`fw-normal ${styles.titleName}`}>{galleryName}</p>
                    <p className={`fw-light text-end ${styles.priceGallery}`}>${price}</p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center ps-lg-4'>
                    <span className={`text-secondary fw-light ${styles.titleName}`}>{title}</span>
                    <button  className={`btn ${styles.button}`}>Suscribete</button>
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
