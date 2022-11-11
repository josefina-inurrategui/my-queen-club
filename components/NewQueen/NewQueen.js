import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import styles from '../../styles/Forms.module.css';
import clientAxios from '../../config/clientAxios';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
 
const style='mb-3 col-md-6 col-sm-12 p-1'


const NewQueen = ({ setQueen }) => {
 
  const schema = Yup.object({
    name: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    email: Yup.string()
      .email("Formato Invalido")
      .required("Email es requerido"),
    password:Yup.string()
    .min(3, 'La contraseña debe tener 3 caracteres como minimo')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .max(25, 'La contraseña puede tener 25 caracteres como maximo')
    .required("Contraseña es requerida")


  }).required();


  const {
    register, handleSubmit, formState: { errors }, reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [image, setImage] = useState()
 
  const onSubmit = async (data) => {

    data = {
      ...data,
      coverImage: image[0],
    }

    console.log(data)

    clientAxios.post('/queen', data)
      .then(response => {
        if (response.status === 200) {
          setQueen(true);
          reset();
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
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          iconColor: '#D44F80',
          title: 'No se puede crear la Queen, Queen existente u otro motivo',
          color: '#FFF8D2',
          background: '#0A1326',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#D44F80',
        });
      });
  };

  const handleImage = (data) => {
    setImage(data)
  }

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{color:'#D44F80'}}>CREAR QUEEN</h2>

      <div className='d-md-flex flex-wrap justify-content-between'>
        <div className={style}>
          <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre</label>
          <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('name', { required: true })} />
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
        </div>
        <div className={style}>
          <label htmlFor="exampleInputEmail2" className={`form-label ${styles.title}`}>Apellido</label>
          <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail2" aria-describedby="emailHelp" {...register('lastName', { required: true })} />
          {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
        </div>
        <div className={style}>
          <label htmlFor="exampleInputEmail3" className={`form-label ${styles.title}`}>Email</label>
          <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail3" aria-describedby="emailHelp" {...register('email', { required: true })} />
          {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        </div>

        <div className={style}>
          <label htmlFor="exampleInputEmail4" className={`form-label ${styles.title}`}>Contraseña</label>
          <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail4" aria-describedby="emailHelp" {...register('password', { required: true })} />
          {errors.password &&<span className='text-danger' >{errors.password.message}</span>
          }
        </div>

      </div>
      <div className="mb-3">
        {
          image?.length > 0 ? <button className='btn btn-primary' disabled>Cargar Portada</button>
            :
            <CloudinaryUploadImage onSave={handleImage} label="Cargar Portada" />
        }

      </div>
      <div className='position-relative'>
        {
          image?.length > 0 && <img className={styles.image} src={image}></img>
        }

      </div>
      <div>
        <button type="submit" disabled={image?.length>0?false:true} className={`btn btn-primary`}>CREAR QUEEN</button>
      </div>
    </form>
  );
};

NewQueen.propTypes = {
  setQueen: PropTypes.func.isRequired,
};

export default NewQueen;
