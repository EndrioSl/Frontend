import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom' 
import { Button, Card, Badge } from 'react-bootstrap';
import api from '../../../shared/services/api'; 
 
import moment from 'moment';  

interface iBook {  
    isbn: string; 
    title: string; 
    author: string;  
    publisher: string; 
    edition: number;
    topic: string; 
    year_published: number;
    description: string;  
    status: boolean; 
    created_at: Date;
  }
   
  
interface IParamsProps {
  id: string;
} 

const Books: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<IParamsProps>();
    const [book, setBook] = useState<iBook>()

    useEffect(() => {
        findBook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function back() {
        history.goBack()
    }

    async function findBook() {

        const response = await api.get<iBook>(`/books/${id}`)
        console.log(response)
        setBook(response.data)

    } 
     
    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY")
    } 

    return(
        <div className="container">
            <br/>
            <div className="book-header">
                <h1>Detalhes do livro</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br/>

            <Card className='justify-content-flex-start'> 
            <Card.Header as="h3"> { book?.title } </Card.Header>                     
                <Card.Body> 
                    <Card.Title> { book?.author }</Card.Title>
                    <Card.Text> 
                    <br/>   
                    <strong>Editora: </strong>
                    {book?.publisher} 
                    <br/>  
                    <strong>Edição: </strong>
                    {book?.edition} 
                    <br/>   
                    <strong>Assunto: </strong>
                    {book?.topic} 
                    <br/>   
                    <strong>Ano de Publicação: </strong>
                    {book?.year_published} 
                    <br/>  
                    <strong>Sinopse: </strong>
                    {book?.description} 
                    <br/> 
                    <strong>Status: </strong>
                    <Badge bg= {book?.status ? "success" : "warning"}>
                        {book?.status ? "Disponível" : "indisponnível"}
                    </Badge>
                    <br />
                    <strong>Data de Cadastro: </strong>
                    <Badge bg ="info">
                        { formateDate(book?.created_at) }
                    </Badge>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default Books;