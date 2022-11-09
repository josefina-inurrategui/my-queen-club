import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import EditAccount from '../../components/EditAccount/EditAccount';
import { useUser } from '../../context/userContext';
import clientAxios from '../../config/clientAxios';
import jwt_decode from "jwt-decode";
import TableBuy from '../../components/TableBuy/TableBuy';
import TableSus from '../../components/TableSus/TableSus';

const User = () => {
  const { userData, flagReload, setFlagReload } = useUser();
  const [user, setUser] = useState(1);
  const router = useRouter();
  const [compras, setCompras] = useState([])

  const logout = () => {
    localStorage.clear();
    setFlagReload(!flagReload);
    router.push('/');
  };

  const infoUser = async () => {
    const response = await clientAxios.get(`/user/${userData.userName}`);
    userData.role = response.data.role
    userData.email = response.data.email
    userData.name = response.data.name
  }

  if (localStorage.getItem('accessToken') != null) {
    const jwt = localStorage.getItem('accessToken')
    const userInfo = jwt_decode(jwt)
    userData.userName = userInfo.userName
    infoUser()

  }

  if(localStorage.getItem('accessToken') === null){
    router.push('/')
  }

  const getCompras = async () => {
    const response = await clientAxios.get(`/purchase/${userData.userName}`);
    setCompras(response.data)
  }

  useEffect(() => {
    getCompras()
  }, [userData])


  return (
    <div className={styles.controlUser}>
      <div className="text-center py-5">
        <h5 className={styles.title}>Editar cuenta</h5>
        <span className={` text-normal ${styles.text} `}>Bienvenido {userData.name}. En esta sección verás toda la información detallada de tú cuenta.</span>
      </div>
      <section className='row gx-0'>
        <section className="d-flex col-12 col-md-4 col-lg-4">
          <div className="border-end">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="mt-3 d-flex align-items-center justify-content-between">
                <i className={`bi bi-person-circle ${styles.icoUser}`}></i>
                <div className="p-4 d-flex flex-column">
                  <a className={` ${styles.column} text-end `} href="#" onClick={logout}>Cerrar sesión</a>
                </div>
              </div>
              <div className="w-100">
                <nav className="nav flex-column mt-5">
                  <div className={`nav-link ${styles.column}`}>
                    <span onClick={() => setUser(1)}>Editar cuenta</span>
                  </div>
                  {userData.role === "client" ?
                    <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis pedidos</span>
                    </div> :
                    <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis Ventas</span>
                    </div>}
                  {userData.role === "client" &&
                    <div>
                      <div className={`nav-link ${styles.column}`}>
                        <span onClick={() => setUser(3)}>Método de pago</span>
                      </div>
                      <div className={`nav-link ${styles.column}`}>
                        <span onClick={() => setUser(4)}>Suscripciones</span>
                      </div>
                    </div>}
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className='col-12 col-md-8 col-lg-7'>
          {user === 1 && <EditAccount name={userData.name} lastName={userData.lastName} userName={userData.userName} email={userData.email} />}
          {user === 2 && <TableBuy role={userData.role} data={compras} key={userData.userName} />}
          {user === 3 && <p className='text-white'>Proximamente</p>}
          {user === 4 && <TableSus data={compras} key={userData.userName} />}
        </section>
      </section>
    </div>
  );
};

export default User;
