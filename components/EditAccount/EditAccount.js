import React, { useState }  from 'react';
import styles from './editAccount.module.css';
import { useForm } from 'react-hook-form';

const EditAccount = ({name , lastName, userName, email  }) => {
  const [isValid, setIsValid] = useState(true);
  const [validUserName, setValidUserName] = useState({});
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    console.log(data)
    // if (data.password !== data.confirmPassword) {
    //   setIsValid(false);
    //   return;
    // }
    console.log("hola")
  }
  
  return (
     <div className="container w-100">
      <forms onSubmit={handleSubmit(onSubmit)} className="row m-3">
        <div className="col-12 d-flex justify-content-between mb-4">
          <div className="col-5">
            <label className={`form-label ${styles.formLabel}`}>Nombre</label>
            <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="nameUser" defaultValue={name} placeholder={name} {...register('name', { required: true })}/>
          </div>
          <div className="col-5">
            <label className={`form-label ${styles.formLabel}`}>Apellido</label>
            <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="lastNameUser" defaultValue={lastName} placeholder={lastName}  {...register('lastName', { required: true })}/>
          </div>
        </div>
        <div className="col-12 mb-4">
          <label className={`form-label ${styles.formLabel}`}>Nombre de Usuario</label>
          <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="nameVisibleUser" defaultValue={userName} aria-describedby="nameVisibleUser" placeholder={userName} {...register('userName', { required: '* Este campo es requerido', minLength: { value: 4, message: '* El nombre de usuario de contener entre 4 y 10 caracteres' }, maxLength: { value: 10, message: '* El nombre de usuario de contener entre 4 y 10 caracteres' } })}  />
          <div id="nameVisibleUser" className={`form-text fst-italic ${styles.formLabel}`}>
            Así será como se mostrará tu nombre en la sección de tú cuenta y en las valoraciones.
          </div>
        </div>
        <div className="col-12 mb-4">
          <label className={`form-label ${styles.formLabel}`}>Correo electrónico</label>
          <input type="email" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="mailUser"  placeholder={email} defaultValue={email} {...register('email', { required: true })}/>
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
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passNew" aria-describedby="passNewHelp" {...register('password', { minLength: { value: 8, message: '* La contraseña debe contener al menos 8 caracteres' } })} />
              <div id="passNewHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
            </div>
            <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Confirmar nueva contraseña</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passRepeat" aria-label="confirmPassword" aria-describedby="passRepeatHelp"  {...register('confirmPassword')}/>
              <div id="passRepeatHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
            </div>
            {isValid === false && <p className={`mb-3 ${styles.text}`}>Las contraseñas no coinciden</p>}
          </div>
        </div>
        <div className="w-100 me-5 text-end">
          <button type="submit" className={`btn ${styles.button}`}>Guardar cambios</button>
        </div>
      </forms>
     </div>
  );
};

export default EditAccount;
