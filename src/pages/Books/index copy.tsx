import React, { useState, useEffect, ChangeEvent }from 'react'; 
import { Container, Form, Col, Row, Badge, Button, Card } from 'react-bootstrap';    
import { useHistory, useParams } from 'react-router-dom' 
import api from '../../services/api';  
import { BookHeader, AllBookCards } from './styles'; 
import { BsFillPencilFill, BsBookmarkPlusFill, BsTrashFill } from "react-icons/bs";

 
interface iBook { 
  id: number; 
  title: string; 
  author: string; 
  isbn: string; 
  status: boolean; 
}
  
interface IParamsProps {
  libraryId: string;
}  

const Detail: React.FC = () => {  
     
  const history = useHistory()
  const [books, setBooks] = useState<iBook[]>([]); 
  const { libraryId } = useParams<IParamsProps>();   
  const libraryIdNumber = Number(libraryId);  
     
  const [searchBook, setSearchBook] = useState(''); 
   
  useEffect(() => {  
    loadBooks(libraryIdNumber);    
  }, []);
     
  async function loadBooks(libraryId: number) { 
    const { data } = await api.get(`/library/${libraryId}/books`);  
    setBooks(data);
  }  
   
  

  function newBooks () { 
    history.push(`/Biblioteca/${libraryId}/CadastroLivros`)
  }   
   
  function editBook(id: number) {
    history.push(`/Biblioteca/${libraryId}/EditarLivro/${id}`)
} 
 
  async function statusBook(id: number) { 
    await api.patch(`/books/${id}`)
    loadBooks(libraryIdNumber)
  }
  
  async function deleteBook(id: number) { 
    await api.delete(`/books/${id}`)
    loadBooks(libraryIdNumber);
  } 

  function viewBook (id: number) { 
    history.push(`/Livros/${id}`)
  }  
   
  function editLibraries () {  
    console.log('editLibrary',libraryIdNumber);
    history.push(`/EditarBiblioteca/${libraryId}`)
  }  
   

  return (
      <Container className="text-center">
        <BookHeader> 
            <h1>Livros Registrados</h1> 
            <Button variant='dark' size='sm' onClick={newBooks}>Novo livro</Button> 
        </BookHeader> 
        <Form style={{ margin: '1% 0 1% 0'}}>
          <Form.Group> 
            <Form.Control 
              type="text" 
              name="searchBook"  
              placeholder="Pesquise seu livro"
              value={searchBook} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchBook(e.target.value)}/> 
            </Form.Group>
        </Form> 
        <Row md='5'>
        {  
                books.map(book =>(   
                <Col key={book.id}>
                  <Card className="text-center" style={{ width: '15rem', marginBottom: '1rem'}}> 
                      <Card.Header style={{ height: '12rem'}}> 
                        <Card.Img variant="top" src="holder.js/100px180" />
                      </Card.Header>
                      <Card.Body className="justify-content-center">
                        <Card.Title> { book.title } </Card.Title>
                        <Card.Subtitle> { book.author} </Card.Subtitle>
                      </Card.Body> 
                      <Card.Footer> 
                        <Button size="sm" variant="link" /*disabled={book.status}*/ onClick={() => editBook(book.id)}><BsFillPencilFill/></Button  >{' '}
                        <Button size="sm" variant="link" onClick={() => viewBook(book.id)}> <BsBookmarkPlusFill/> </Button>{' '}
                        <Button size="sm" variant="link" onClick={() => deleteBook(book.id)}> <BsTrashFill/> </Button>{' '} 
                        <Button size="sm" variant="success" onClick={() => statusBook(book.id)}> Status </Button>{' '}  
                      </Card.Footer>
                  </Card>   
              </Col>  
          ))
        }    
        </Row>
        <Button variant='dark' size='sm' onClick={editLibraries}>EditarBiblioteca</Button>  
      </Container>
  );
 } 
  
export default Detail; 