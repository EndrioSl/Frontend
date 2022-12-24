import React, { useState, useEffect }from 'react'; 
import { Badge, Button, Table } from 'react-bootstrap';    
import { useHistory, useParams } from 'react-router-dom' 
import api from '../../services/api';   
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
    const response = await api.get('/libraries'); 
    console.log(response); 
    setLibraries(response.data); 
  } 

  function newLibrary () { 
    history.push(`/CadastroBiblioteca`)
  }    
  
  function loadLibrary (id: number){ 
    history.push(`/Biblioteca/${id}/Livros`);
  } 

  return (
      <div className="container"> 
        <LibraryHeader> 
            <h1>Biblitecas Registradas</h1> 
            <Button variant='dark' size='sm' onClick={newLibrary}>Nova biblitoeca</Button>
        </LibraryHeader> 
        <br/> 
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>  
             
             { 
                libraries.map(library =>( 
                    <tr key={library.id}> 
                      <td> { library.nome }</td>   
                      <td><Button size="sm" variant="success" onClick={() => loadLibrary(library.id)}> Acessar </Button></td>
                  </tr> 
                )) 
             } 

          </tbody>
        </Table>
    </div>
  );
 } 
  
export default Libraries; 