import React from 'react';
import PropTypes from 'prop-types';
import styles from './infosubs.module.css';
import ModalSingIn from '../ModalSingIn/ModalSingIn';
import GeneralModal from '../GeneralModal/GeneralModal';

import data from '../../data/suscribe.json';

const InfoSubs = ({ className }) => {
  return (
    <div className={`container-fluid w-100 w-md-50 ${className}`}>
      <div className='h-100 row d-flex justify-content-center align-items-center'>
        <div data-bs-toggle="modal" data-bs-target='#suscribemodal' className='col-12 col-md-5 col-lg-4 d-flex justify-content-center'>
          <a className={`d-flex align-items-center fs-5 ${styles.colorLink}`}><i className="bi bi-question-circle fs-1 pe-4"></i>¿CÓMO ME SUSCRIBO?</a>
        </div>
        <div className={`d-none d-md-block ${styles.simbol}`}/>
        <div className='col-12 col-md-5 col-lg-4 pt-4 pt-md-0 pt-lg-0 d-flex justify-content-center'>
          <a className={`d-flex align-items-center fs-5 ${styles.colorLink}`} data-bs-toggle="modal" data-bs-target="#register"><i className="bi bi-person-plus fs-1 pe-4"></i>REGISTRARME</a>
          <ModalSingIn isRegister idModal='register' activeRegister={2}/>
        </div>
      </div>

      <GeneralModal id='suscribemodal'>
        <h3 className={`mb-4 ${styles.textColorSecondary}`}>¿Cómo me suscribo?</h3>
        {
          data.map((text, i) => (
            <div key={i} className="mt-2">
              <p className={styles.textColorSecondary}>{text.presentation}</p>
              <h6 className={styles.textColorPrimary}>{text.question}</h6>
              <p className={styles.textColorSecondary}>{text.answer}</p>
            </div>
          ))
        }
      </GeneralModal>

    </div>
  );
};

InfoSubs.propTypes = {
  className: PropTypes.string.isRequired,
};

export default InfoSubs;
