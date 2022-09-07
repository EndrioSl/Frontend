import React, { useState, useEffect, ChangeEvent  }from 'react';  
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';  
import api from '../../../services/api';   

 
interface iBook { 
  title: string; 
  author: string; 
  description: string; 
}
 
interface IParamsProps {
  id: string;
} 

const Books: React.FC = () => {  
   
  const history = useHistory()
  const { id } = useParams<IParamsProps>();
  const [model, setModel] = useState<iBook>({
      title: '', 
      author: '',
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
          const response = await api.post('/books', model)
      }
      back()

  }

  async function findBook (id: string) {
      const response = await api.get(`books/${id}`)
      setModel({
          title: response.data.title, 
          author: response.data.author,
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