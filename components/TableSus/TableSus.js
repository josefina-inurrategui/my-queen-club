import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/router';
import styles from './TableSus.module.css';
import React, { useState } from 'react';

const TableSus = ({ data }) => {
    const router = useRouter();
    const handleClick = (galleryName) => {
        router.push(`/galleries`);
    };
    const daysRest = (dateBuy) => {
        const today = new Date().getTime()
        const dif = parseInt(30 - (today - dateBuy.getTime()) / (1000 * 60 * 60 * 24))
        return dif
    }
    return (
        <div>
            {data.length === 0 ? <p className='text-white'>No tienes compras</p> :
                <Table striped bordered hover variant="dark" responsive >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Queen</th>
                            <th>Galeria</th>
                            <th>Dias restantes</th>
                            <th>Ir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(i =>
                            i.available &&
                            <tr>
                                <td>{data.indexOf(i) + 1}</td>
                                <td>{i.queen}</td>
                                <td>{i.galleryName}</td>
                                <td>{daysRest(new Date(i.createdAt))}</td>
                                <td><button className={`btn ${styles.button}`} onClick={handleClick} >Link</button></td>
                            </tr>)}
                    </tbody>
                </Table>
            }
        </div>
    );
}

export default TableSus;