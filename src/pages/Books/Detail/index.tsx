import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom' 
import { Button, Card, Badge } from 'react-bootstrap';
import api from '../../../services/api'; 
 
import moment from 'moment';  

interface iBook { 
  title: string; 
  author: string;  
  status: boolean;
  description: string;   
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
                <h1>Datalhes do livro</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br/>

            <Card> 
            <Card.Header as="h3"> { book?.title } </Card.Header>                     
                <Card.Body> 
                    <Card.Title> { book?.author }</Card.Title>
                    <Card.Text> 
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