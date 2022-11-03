import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './cardhome.module.css';

const CardHome = ({
  coverImage, name, alt, _id,
}) => {
  console.log(coverImage)
  return (
    <div className='m-1 position-relative'>
      <img src={coverImage} alt={name} /* height={1920} width={1200} layout="responsive" quality={100} priority */ className={styles.cardHome} />
      <div className='text-center position-absolute h-100 w-100 d-flex justify-content-center align-items-center top-0'>
        <div className={`text-white ${styles.cardInfo}`}>
          <h5 className={`mb-4 ${styles.titleName}`}>{name}</h5>
          <Link href={`/galleries/${name}`} passHref>
            <button type="button" className={`btn btn-outline-light mt-1 ${styles.buttonStyle}`} >Ver Galerias</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

CardHome.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default CardHome;
