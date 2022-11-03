/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';
import styles from '../../styles/Forms.module.css';
import clientAxios from '../../config/clientAxios';
import Image from 'next/image';

const NewGallery = ({ queenSelect }) => {
  const [queen, setQueen] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [coverPhotoGallery, setCoverPhotoGallery] = useState('');
  const [three, setThree] = useState([])
  const [censoriship, setCensoriship] = useState('')


  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const dataFinished={
      ...data,
      coverPhotoGallery:coverPhotoGallery[0],
      photoBlur:censoriship,
      photosShow:three,
      photos:gallery
    }
    console.log('hola')
    console.log(dataFinished)
    /*  clientAxios.post('/galleries', data)
       .then(response => console.log(response.data)); */
  };
/*   console.log(coverPhotoGallery) */
  
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

  const handleDeleteCover = (img) => {
    setCoverPhotoGallery(coverPhotoGallery.filter(res => res !== img))
  }

  const handleDeleteThree=(img)=>{
     setThree(three.filter(res=>res!==img))
  }
  const handleThreeImages = (img) => {
    if (three === 3) return;
    setThree(img)
  }
  const handleCensorshipImage = (img) => {

  }
/*   console.log(three,'soy las tres fotos')
  console.log(coverPhotoGallery,'soy cover photo') */

  useEffect(() => {
    handleQueen();
  }, [queenSelect]);

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-3 pt-5">
        <h2 className='text-white'>CREAR GALERIA</h2>
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre de Queen</label>
        <select className={`form-select ${styles.placeholder}`} aria-label="Default select example" {...register('idQueen', { required: true })}>
          <option selected>Seleccione una Queen</option>
          {
            queen.length > 0 && queen.map(x => <option key={x._id} value={x._id}>{x.name}</option>)
          }
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
        <div className='d-flex flex-wrap '>
          {coverPhotoGallery && coverPhotoGallery?.map((or) => {
            return (
              <>
                <div className='position-relative'>
                  <img className={styles.image} key={or} src={or} alt={or} />
                  {/* <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteCover(or)}> x </div> */}
                </div>
              </>
            )
          })
          }
        </div>
      </div>
      <div className='d-flex col-12 justify-content-between flex-wrap'>
        <div className="mb-3 col-md-5 col-sm-12">
          <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Precio de la Galeria en ARS</label>
          <input type="number" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('price', { required: true })} />
          {errors.exampleRequired && <span className={`${styles.title}`}>Este campo es requerido</span>}
        </div>
        <div className="mb-3 col-md-5 col-sm-12">
          <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Precio de la Galeria en USD</label>
          <input type="number" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('price_USD', { required: true })} />
          {errors.exampleRequired && <span className={`${styles.title}`}>Este campo es requerido</span>}
        </div>
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>Galería de Fotos</label>
        </div>
        <div className="mb-3">
          <CloudinaryUploadImage onSave={handleThreeImages} label="Cargar 3 Fotos sin censura" />
          <div className='d-flex flex-wrap '>
            {three.length > 0 && three?.map((or) => {
              return (
                <>
                  <div className='position-relative'>
                    <img className={styles.image} key={or} src={or} alt={or} />
                    {/* <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteThree(or)}> x </div> */}
                  </div>
                </>
              )
            })
            }
          </div>
        </div>
        <div className="mb-3">
          <CloudinaryUploadImage onSave={handleCensorshipImage} label="Cargar Foto Censurada" />
        </div>
        <div className="mb-3">
          <CloudinaryUploadImage onSave={handleGalleryImages} label="Cargar fotos de Galeria" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary"> Crear galería </button>
    </form>
  );
};

NewGallery.propTypes = {
  queenSelect: PropTypes.bool.isRequired,
};

export default NewGallery;
