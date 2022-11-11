import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import classesText from '../../styles/Galleries.module.css';
import styles from './AlertSecurity.module.css';
import { useUser } from '../../context/userContext';


function AlertSecurity() {
    return (
        <div className={`h-100  w-100 m-auto ${classesText.bgHome} p-5`}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title className={`m-2 ${classesText.title}`}>¡ALERTAS DE SEGURIDAD!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={`m-2 ${classesText.title}`}>Evita sanciones y bloqueos permanentes de tu cuenta, My Queens Club cuenta con
                        herramientas para localizar los intentos de extracción de contenido.</p>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}

export default AlertSecurity;