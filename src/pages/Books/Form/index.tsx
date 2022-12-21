import React, { useState, useEffect, ChangeEvent  }from 'react';  
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';   
import api from '../../../services/api'; 
 
interface iBook {  
  isbn: string; 
  title: string; 
  author: string;  
  publisher: string; 
  edition: number;
  topic: string; 
  year_published: number;
  description: string; 
}
 
interface IParamsProps {
  id: string;  
  libraryId: string;
} 

const Books: React.FC = () => {  
   
  const {  } = useParams();  
  const history = useHistory()
  const { id } = useParams<IParamsProps>(); 
  const { libraryId } = useParams<IParamsProps>();
  const [model, setModel] = useState<iBook>({ 
      isbn: '',
      title: '', 
      author: '', 
      publisher: '', 
      edition: 1,
      topic: '', 
      year_published: 0,
      description: ''
  })

  useEffect(() => {
      if (id !== undefined) {
          findBook(id)
      }
  }, [id])

  function updatedModel (e: ChangeEvent<HTMLInputElement>) {

      setModel({
          ...model,
          [e.target.name]: e.target.value
      })
 
  } 
   

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()

      if (id !== undefined) {
          const response = await api.put(`/books/${id}`, model)
      } else {
          const response = await api.post(`/library/${libraryId}/saveBook`, model)
      }
      back()

  }

  async function findBook (id: string) {
      const response = await api.get(`books/${id}`)
      setModel({ 
          isbn: response.data.isbn,
          title: response.data.title, 
          author: response.data.author,  
          publisher: response.data.publisher, 
          edition: response.data.edition, 
          topic: response.data.topic, 
          year_published: response.data.year_published,
          description: response.data.description
      })
  }

  function back () {
      history.goBack()
  }


  return (
    <div className="container"> 
        <div className='books-header'> 
            <h1>Novo livro</h1> 
        </div>  
        <div className="container">
                  <Form onSubmit={onSubmit}>
                      <Form.Group> 
                      <Form.Label>ISBN</Form.Label>
                          <Form.Control 
                              type="text" 
                              name="isbn"
                              value={model.isbn}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        /> 
                      </Form.Group>  
                      <Form.Group> 
                          <Form.Label>Título</Form.Label>
                          <Form.Control 
                              type="text" 
                              name="title"
                              value={model.title}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group> 

                     <Form.Group>
                        <Form.Label>Autor</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="author"
                            value={model.author}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group> 
 
 
                    <Form.Group>
                        <Form.Label>Editora</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="publisher"
                            value={model.publisher}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group>  
                     
                     
                    <Form.Group>
                        <Form.Label>Edição</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="edition"
                            value={model.edition}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group>  

                    <Form.Group>
                        <Form.Label>Assunto</Form.Label>
                        <Form.Control 
                            type="string" 
                            name="topic"
                            value={model.topic}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group>    
                     
                    <Form.Group>
                        <Form.Label>Ano publicado</Form.Label>
                        <Form.Control 
                            type="string" 
                            name="year_published"
                            value={model.year_published}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group>   


                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={model.description}
                            name="description"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group> 
                     
                     
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
    </div>
  );
 } 
  
export default Books; 