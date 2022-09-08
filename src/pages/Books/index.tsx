import React, { useState, useEffect }from 'react'; 
import { Badge, Button, Table } from 'react-bootstrap';    
import { useHistory } from 'react-router-dom' 
import api from '../../services/api';  
import { BookHeader } from './styles';
 
interface iBook { 
  id: number; 
  title: string; 
  author: string; 
  isbn: string; 
  status: boolean; 
}
 
const Detail: React.FC = () => {  
     
  const history = useHistory()
  const [books, setBooks] = useState<iBook[]>([]); 
   

  useEffect(() => { 
    loadBooks();     
  }, []);
   
  async function loadBooks() { 
    const response = await api.get('/books'); 
    console.log(response); 
    setBooks(response.data);
  } 
   
  function newBooks () { 
    history.push('/CadastroLivros')
  }   
   
  function editBook(id: number) {
    history.push(`/CadastroLivros/${id}`)
} 
 
  async function statusBook(id: number) { 
    await api.patch(`/books/${id}`)
    loadBooks()
  }
  
  async function deleteBook(id: number) { 
    await api.delete(`/books/${id}`)
    loadBooks()
  } 

  function viewBook (id: number) { 
    history.push(`/Livros/${id}`)
  } 

  return (
      <div className="container"> 
        <BookHeader> 
            <h1>Livros Registrados</h1> 
            <Button variant='dark' size='sm' onClick={newBooks}>Novo livro</Button>
        </BookHeader> 
        <br/> 
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Autor</th> 
              <th>ISBN</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>  
             
             { 
                books.map(book =>( 
                    <tr key={book.id}>
                      <td> { book.id }</td>
                      <td> { book.title } </td>
                      <td> { book.author} </td>
                      <td> { book.isbn} </td> 
                      <td>   
                          <Badge bg={ book.status ? "success" : "warning" }>
                          { book.status ? 'Diponivel' : 'Indisponivel' } 
                          </Badge> 
                      </td> 
                      <td> 
                        <Button size="sm" /*disabled={book.status}*/ onClick={() => editBook(book.id)}> Editar </Button>{' '}
                        <Button size="sm" variant="success" onClick={() => statusBook(book.id)}> Status </Button>{' '} 
                        <Button size="sm" variant="info" onClick={() => viewBook(book.id)}> Detalhes </Button>{' '}
                        <Button size="sm" variant="danger" onClick={() => deleteBook(book.id)}> Apagar </Button>{' '}
                      </td>
                  </tr> 

                )) 
             } 

          </tbody>
        </Table>
    </div>
  );
 } 
  
export default Detail; 