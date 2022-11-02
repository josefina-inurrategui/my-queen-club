/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';
import styles from '../../styles/Forms.module.css';
import clientAxios from '../../config/clientAxios';
import Swal from 'sweetalert2';

const NewGallery = ({ queenSelect }) => {
  const [queen, setQueen] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [coverPhotoGallery, setCoverPhotoGallery] = useState('');
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.photos = gallery
    data.coverPhotoGallery = coverPhotoGallery[0]
    clientAxios.post('/galleries', JSON.stringify(data))
      .then(response => {
        if(response.status === 200){
        Swal.fire({
          icon: 'success',
          iconColor: '#D44F80',
          title: response.data,
          color: '#FFF8D2',
          background: '#0A1326',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#D44F80',
        })}
      })
  };

  const handleQueen = async () => {
    clientAxios.get('/queen')
      .then(response => setQueen(response.data));
  };

  const handleGalleryImages = (arrayImages) => {
    setGallery(arrayImages);
  };

  const handleCoverPhotoGallery = (arrayImages) => {
    setCoverPhotoGallery(arrayImages);
  };

  useEffect(() => {
    handleQueen();
  }, [queenSelect]);

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 pt-5">
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre de Queen</label>
        <select className={`form-select ${styles.placeholder}`} aria-label="Default select example" {...register('idQueen', { required: true })}>
          {/* <option selected>Seleccione una Queen</option> */}
          <option selected>facu</option>
          {/* {
            queen.length > 0 && queen.map(x => <option key={x._id} value={x._id}>{x.name}</option>)
          } */}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre de la Galería</label>
        <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('galleryName', { required: true })} />
        {errors.exampleRequired && <span className={`${styles.title}`}>Este campo es requerido</span>}
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>Foto de portada</label>
        </div>
        <CloudinaryUploadImage onSave={handleCoverPhotoGallery} label="Cargar foto portada" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Precio de la Galeria</label>
        <input type="number" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('price', { required: true })} />
        {errors.exampleRequired && <span className={`${styles.title}`}>Este campo es requerido</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Precio en dolares de la Galeria</label>
        <input type="number" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('price_USD', { required: true })} />
        {errors.exampleRequired && <span className={`${styles.title}`}>Este campo es requerido</span>}
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>Galería</label>
        </div>
        <CloudinaryUploadImage onSave={handleGalleryImages} label="Cargar galeria"/>
      </div>
      <button type="submit" className="btn btn-primary">Crear galería</button>
    </form>
  );
};

NewGallery.propTypes = {
  queenSelect: PropTypes.bool.isRequired,
};

export default NewGallery;
