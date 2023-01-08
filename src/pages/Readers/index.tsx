import React, { useState, useEffect, ChangeEvent } from 'react';
import { Badge, Button, Container, Modal, Table, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../shared/services/api';
import { ReaderHeader } from './styles';

interface iReader {
    id: number;
    nome: string;
} 
  
interface IParamsProps {
    libraryId: string;
}

const Reader: React.FC = () => {
 
    const history = useHistory()
    const [readers, setReaders] = useState<iReader[]>([]);
    const [searchReader, setSearchReader] = useState<string>('');  
    let modeViewReaders = false; 

    const { libraryId } = useParams<IParamsProps>(); 
 
    async function loadReaders() {
        if (modeViewReaders === true ) { 
            const { data } = await api.get('/readers');  
            return setReaders(data);
        } if (modeViewReaders === false ) { 
            const { data } = await api.get(`/library/${libraryId}/readers`);  
            return setReaders(data);
        };
    } 
      
    async function addReaderLibrary(id: number) {  
        const { data } = await api.post(`/library/${libraryId}/addReader/${id}`);   
        loadReaders(); 
    }   
     
    async function removeReaderLibrary(id: number) {  
        const { data } = await api.delete(`/library/${libraryId}/addReader/${id}`);   
        loadReaders(); 
    }  
     
    useEffect(() => {
        if (searchReader.length === 0) {
            loadReaders();
            return;
        } 
        if (searchReader.length > 0) { 
            if (modeViewReaders){ 
                const updatedSearch = async () => {
                    const fetchReader = await getSearchReader(searchReader);
                    setReaders(fetchReader);
                }  
                updatedSearch(); 
                return;
            } else { 
                const updatedSearch = async () => {
                    const fetchReader = await getSearchReaderLibrary(searchReader);
                    setReaders(fetchReader);    
                } 
                updatedSearch(); 
                return;
            }
            return;
        } 
        
    }, [searchReader]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchReader(event.target.value);
    }
     
    const getSearchReader = async (name: string): Promise<iReader[]> => {
        const { data } = await api.get(`/library/${libraryId}/allreaders/search/?name=${name}`);

        return data;
    }  

    const getSearchReaderLibrary = async (name: string): Promise<iReader[]> => {
        const { data } = await api.get(`/library/${libraryId}/readers/search/?name=${name}`);

        return data;
    }  

     
    async function changeModeViewReaders() {
        if (modeViewReaders){  
            modeViewReaders = false;
            return modeViewReaders;
         } else {  
            modeViewReaders = true;
            return modeViewReaders;
        } 
        console.log('fora do if',modeViewReaders)
    }  
     
    return (
        <Container>
            <ReaderHeader>
                <h1>{ modeViewReaders ? 'Todos os leitores registrados ' : 'Leitores vinculados a sua bibliteca' }</h1> 
                <Button variant="dark" onClick={changeModeViewReaders} > Alterar modo</Button>
            </ReaderHeader>
            <br /> 
            <Form style={{ margin: '1% 0 1% 0' }}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="searchReader"
                        placeholder="Pesquise o nome do leitor"
                        value={searchReader}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        readers.map(reader => (
                            <tr key={reader.id}> 
                                <td> {reader.nome}</td>    
                                <td> 
                                    { modeViewReaders  ? 
                                         <Button size="sm" variant="primary" onClick={() => addReaderLibrary(reader.id)}> Vincular </Button>  
                                    :  
                                    <Button size="sm" variant="primary" onClick={() => removeReaderLibrary  (reader.id)}> Desvincular </Button>
                                    }
                               </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </Container>
    );
}

export default Reader;