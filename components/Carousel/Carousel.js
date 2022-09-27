import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './carousel.module.css';

const Carousel = ({ carouselInfo, carouselInfoMobile }) => {
  return (
    <>
      <div id="carouselIndicators" className="carousel slide d-none d-md-block" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {
            carouselInfo.map((info, index) => (
              <button type="button" key={info.alt} data-bs-target="#carouselIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : undefined} aria-current="true" aria-label={`Slide ${index + 1}`} />
            ))
          }
        </div>
        <div className="carousel-inner">
          {
            carouselInfo.map((info, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : undefined}`} key={info.alt}>
                <div className='vw-100 h-100 position-absolute d-flex justify-content-center align-items-center text-uppercase'>
                  <h3 className={styles.title}>{info.title}</h3>
                </div>
                <Image src={info.src} width={1636} height={960} layout="responsive" alt={info.alt} />
              </div>
            ))
          }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div id="carouselIndicatorsMobile" className="carousel slide d-block d-md-none" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {
            carouselInfoMobile.map((info, index) => (
              <button type="button" key={index} data-bs-target="#carouselIndicatorsMobile" data-bs-slide-to={index} className={index === 0 ? 'active' : undefined} aria-current="true" aria-label={`Slide ${index + 1}`} />
            ))
          }
        </div>
        <div className="carousel-inner">
          {
            carouselInfoMobile.map((info, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : undefined}`} key={index}>
                <div className='vw-100 h-100 position-absolute d-flex justify-content-center align-items-center text-uppercase'>
                  <h5 className={styles.title}>{info.title}</h5>
                </div>
                <Image src={info.src} width={200} height={300} layout="responsive" alt={info.alt} />
              </div>
            ))
          }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicatorsMobile" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicatorsMobile" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

Carousel.propTypes = {
  carouselInfo: PropTypes.array.isRequired,
  carouselInfoMobile: PropTypes.array.isRequired,
};

export default Carousel;
