import React from 'react';
import styles from './editAccount.module.css';

const EditAccount = ({name , lastName, userName, email  }) => {
  return (
     <div className="container w-100">
      <forms className="row m-3">
        <div className="col-12 d-flex justify-content-between mb-4">
          <div className="col-5">
            <label className={`form-label ${styles.formLabel}`}>Nombre</label>
            <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="nameUser" placeholder={name}/>
          </div>
          <div className="col-5">
            <label className={`form-label ${styles.formLabel}`}>Apellido</label>
            <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="lastNameUser" placeholder={lastName} />
          </div>
        </div>
        <div className="col-12 mb-4">
          <label className={`form-label ${styles.formLabel}`}>Nombre de Usuario</label>
          <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="nameVisibleUser" aria-describedby="nameVisibleUser" placeholder={userName}  />
          <div id="nameVisibleUser" className={`form-text fst-italic ${styles.formLabel}`}>
            Así será como se mostrará tu nombre en la sección de tú cuenta y en las valoraciones.
          </div>
        </div>
        <div className="col-12 mb-4">
          <label className={`form-label ${styles.formLabel}`}>Correo electrónico</label>
          <input type="email" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="mailUser"  placeholder={email}/>
        </div>
        <div className="col-12 d-flex justify-content-center flex-column border p-3 m2 cardPassword">
          <h5 className={ styles.formLabel }>Cambio de contraseña</h5>
          <div className="card-body">
            <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Contraseña actual</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passOld" aria-describedby="passOldHelp" />
              <div id="passOldHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
            </div>
            <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Contraseña nueva</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passNew" aria-describedby="passNewHelp" />
              <div id="passNewHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
            </div>
            <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Confirmar nueva contraseña</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passRepeat" aria-describedby="passRepeatHelp" />
              <div id="passRepeatHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
            </div>
          </div>
        </div>
        <div className="w-100 me-5 text-end">
          <input className={`btn ${styles.button}`} type="submit" value="Guardar cambios" />
        </div>
      </forms>
     </div>
  );
};

export default EditAccount;
