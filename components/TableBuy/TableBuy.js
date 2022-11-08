import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';

const TableBuy = ({ data }) => {
    return (
        <div>
            {data.length === 0 ? <p className='text-white'>No tienes compras</p> :
                <Table striped bordered hover variant="dark" responsive >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Queen</th>
                            <th>Galeria</th>
                            <th>Fecha de Compra</th>
                            <th>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(i =>
                            <tr>
                                <td>{data.indexOf(i) + 1}</td>
                                <td>{i.queen}</td>
                                <td>{i.galleryName}</td>
                                <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                                <td>{i.available ? "Si" : "Vencida"}</td>
                            </tr>)}
                    </tbody>
                </Table>
            }
        </div>
    );
}

export default TableBuy;