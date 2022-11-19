import React from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import styles from '../modalSingIn/modalsingin.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import LoaderInit from '../Loader/LoaderInit';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';

const ModalEditGallery = ({ idModal, galeria }) => {

    console.log(galeria)
    const [threPhotos, setThrePhotos] = useState([])
    const [photos, setPhotos] = useState([])
    const [blur, setBlur] = useState('')
    const [cover, setCover] = useState('')

    const UpdateUserSchema = Yup.object().shape({
        galleryName: Yup.string().required('Name is required'),
    });

    const defaultValues = {
        galleryName: galeria?.galleryName,
        price_USD: galeria?.price_USD,
        price: galeria?.price,
    }

    useEffect(() => {
        if (galeria) {
            reset(defaultValues);
        }
    }, [galeria]);
   

    const onSubmit = (data) => {
        console.log(data)
    }


    const handleCover=(data)=>{
        setCover(data)
    }
    const handleThree=(data)=>{
        setThrePhotos(data)
    }
    const handleBlur=(data)=>{
        setBlur(data)
    }


    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues
    });

    /*  if(galeria===undefined)return <LoaderInit/> */
    return (
        <div className="p-5 d-flex  justify-content-center align-items-center" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className='d-flex w-100 justify-content-center' >
                    <div className="mb-3 m-2">
                        <label htmlFor="nombreGaleria" className={`form-label ${styles.label_edit}`}>Nombre </label>
                        <input autoComplete='false' type="text" className="form-control" id="nombreGaleria" {...register('galleryName', { required: true })} />
                    </div>
                    <div className="mb-3 m-2">
                        <label htmlFor="precioArs" className={`form-label ${styles.label_edit}`}>Precio ARS</label>
                        <input type="number" className="form-control" id="precioArs" {...register('price', { required: true })} />
                    </div>
                    <div className="mb-3 m-2">
                        <label htmlFor="precioUsd" className={`form-label ${styles.label_edit}`}>Precio USD</label>
                        <input type="number" className="form-control" id="precioUsd"  {...register('price_USD', { required: true })} />
                    </div>
                </section>
                <section className={`w-100 ${styles.container_photos}`}>
                    <h3 className='text-white'>FOTOS</h3>
                </section>
                <CloudinaryUploadImage onSave={handleCover} label='+'/>
                <CloudinaryUploadImage onSave={handleThree} label='+'/>
                <CloudinaryUploadImage onSave={handleBlur} label='+'/>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    )
}

export default ModalEditGallery