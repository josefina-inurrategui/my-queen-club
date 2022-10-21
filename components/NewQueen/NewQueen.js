import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import styles from '../../styles/Forms.module.css';
import clientAxios from '../../config/clientAxios';

const NewQueen = ({ setQueen }) => {
  
  const urlbase = process.env.NEXT_PUBLIC_URL_BASE;
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    clientAxios.post('/queen', data)
      .then(response => {
        if (response.status === 200) {
          setQueen(true);
          Swal.fire({
            icon: 'success',
            iconColor: '#D44F80',
            title: 'Queen creada con éxito',
            color: '#FFF8D2',
            background: '#0A1326',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#D44F80',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          iconColor: '#D44F80',
          title: 'No se puede crear la Queen',
          color: '#FFF8D2',
          background: '#0A1326',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#D44F80',
        });
      });
  };

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre de Queen</label>
        <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('name', { required: true })} />
        {errors.exampleRequired && <span>Este campo es requerido</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className={`form-label ${styles.title}`}>Imágen de Portada</label>
        <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('coverImage', { required: true })} />
        {errors.exampleRequired && <span>Este campo es requerido</span>}
      </div>
      <div className='text-end'>
        <button type="submit" className={`btn ${styles.button}`}>Crear Queen</button>
      </div>
    </form>
  );
};

NewQueen.propTypes = {
  setQueen: PropTypes.func.isRequired,
};

export default NewQueen;
