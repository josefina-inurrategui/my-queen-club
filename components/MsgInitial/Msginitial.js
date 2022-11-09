import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import classes from '../../styles/Forms.module.css';
import classesText from '../../styles/Galleries.module.css';
import styles from './Msginitial.module.css';
import { useUser}  from '../../context/userContext';


function Msginitial () {
    const { setAcept } = useUser();
    const router = useRouter()
    const handleExit = () => {
        router.push("https://www.google.com/")
    }
    const handleAcept = () =>{
        setAcept(false)
      }


    return (
    <div className={`h-100  w-100 m-auto ${classesText.bgHome} p-5`}> 
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title className={`m-2 ${classesText.title}`}>¡BIENVENIDX A MY QUEENS CLUB!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className={`m-2 ${classesText.title}`}>Nuestro sitio web contiene contenido para adultos y debes ser mayor de edad, respetando
                    todas las normas que presentamos en nuestros <span className={styles.text}>términos y condiciones</span></p>
                <p className={`m-2 ${classesText.title}`}>También, nuestro sitio web cuenta con sistemas de seguridad que debes aceptar y respetar
                    para evitar todo tipo de sanciones como se indican en nuestra <span className={styles.text}>política de privacidad.</span></p>
                <p className={`m-2 ${classesText.title}`}>Al "Aceptar" e ingresar en nuestro sitio web, estás aceptando todo lo anterior y certificando
                    que sos mayor de edad.</p>
                <p className={`m-2 ${classesText.title}`} >¡Gracias por elegir ser parte del Club!</p>
            </Modal.Body>

            <Modal.Footer>
                <Button className='m-2' variant="secondary" onClick={handleExit} >Rechazar</Button>
                <button onClick={handleAcept} className={`btn ${classesText.button}`} ><span>Soy mayor de 18 años y acepto todas las condiciones</span></button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
    );
}

export default Msginitial;