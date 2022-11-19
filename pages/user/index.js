import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import styles from '../../styles/Home.module.css';
import EditAccount from '../../components/EditAccount/EditAccount';
import { useUser } from '../../context/userContext';
import clientAxios from '../../config/clientAxios';
import jwt_decode from "jwt-decode";
import TableBuy from '../../components/TableBuy/TableBuy';
import TableSus from '../../components/TableSus/TableSus';

const User = ({ purchase }) => {
  const { userData, flagReload, setFlagReload } = useUser();
  const [user, setUser] = useState(1);
  const router = useRouter();
  const [compras, setCompras] = useState([])
  const [name , setName] = useState("");
  const [lastName , setLastName] = useState("");
  const [role , setRole] = useState("client");
  const [idUser , setIdUser] = useState("");
  const [email , setEmail] = useState("");


  const logout = () => {
    localStorage.clear();
    setFlagReload(!flagReload);
    router.push('/');
  };

  const infoUser = async () => {
    const response = await clientAxios.get(`/user/${userData.userName}`);
    setRole(response.data.role);
    setName(response.data.name);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setIdUser(response.data._id);
  }
  
  const getCompras = async () => {
    const response = await clientAxios.get(`/purchase/${idUser}`);
    setCompras(response.data)
    console.log(response.data)
  }

  if (localStorage.getItem('accessToken') != null) {
    infoUser()
  }
  console.log()
  if(localStorage.getItem('accessToken') === null){
    router.push('/')
  }

  // probar useEffect cmabio de usuario 

  useEffect(() => {
    getCompras()
  }, [idUser])


  return (
    <div className={styles.controlUser}>
      <div className="text-center py-5">
        <h5 className={styles.title}>Editar cuenta</h5>
        <span className={` text-normal ${styles.text} `}>Bienvenido {name}. En esta sección verás toda la información detallada de tú cuenta.</span>
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
                  {role === "client" ?
                    <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis pedidos</span>
                    </div> :
                    <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis Ventas</span>
                    </div>}
                  {role === "client" &&
                    <div>
                      {/* <div className={`nav-link ${styles.column}`}>
                        <span onClick={() => setUser(3)}>Método de pago</span>
                      </div> */}
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
          {user === 1 && <EditAccount name={name} lastName={lastName} userName={userData.userName} email={email} />}
          {user === 2 && <TableBuy role={role} data={compras} key={userData.userName} />}
          {/* {user === 3 && <p className='text-white'>Proximamente</p>} */}
          {user === 4 && <TableSus data={compras} key={userData.userName} />}
        </section>
      </section>
    </div>
  );
};

/* export const getStaticProps = async () => {
  return {
    props: { purchase: compras },
  };
}; */

export default User;
