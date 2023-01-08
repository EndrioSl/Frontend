import React, { useState, useEffect } from 'react';
import { Badge, Button, Container, Table } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../shared/services/api';
import { LibraryHeader } from './styles';

interface iLibrary {
    id: number;
    nome: string;
}
 

const Libraries: React.FC = () => {

    const history = useHistory()
    const [libraries, setLibraries] = useState<iLibrary[]>([]);

    useEffect(() => {
        loadLibraries();
    }, []);

    async function loadLibraries() {
        const { data } = await api.get('/libraries');
        setLibraries(data);
    }

    function newLibrary() {
        history.push(`/CadastroBiblioteca`)
    }

    function loadLibrary(id: number) {
        history.push(`/Biblioteca/${id}/Livros`);
    }

    return (
        <Container>
            <LibraryHeader>
                <h1>Biblitecas Registradas</h1>
            </LibraryHeader>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        libraries.map(library => (
                            <tr key={library.id}>
                                <td> {library.nome}</td>
                                <td><Button size="sm" variant="success" onClick={() => loadLibrary(library.id)}> Acessar </Button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </Container>
    );
}

export default Libraries; 