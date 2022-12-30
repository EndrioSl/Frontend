import React, { useState, useEffect, ChangeEvent  }from 'react';  
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';  
import api from '../../../services/api';   

interface iReader {  
  email: string; 
  password: string; 
  nome: string;   
}
 
interface IParamsProps {
  readerId: string;
} 

const ReadersForm: React.FC = () => {  
   
  const history = useHistory()
  const { readerId } = useParams<IParamsProps>();
  const [model, setModel] = useState<iReader>({ 
      email: '',
      password: '', 
      nome: ''
  })

  useEffect(() => {
      if (readerId !== undefined) {
          findLibrary(readerId)
      }
  }, [readerId])

  function updatedModel (e: ChangeEvent<HTMLInputElement>) {

      setModel({
          ...model,
          [e.target.name]: e.target.value
      })
 
  } 
   

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
 
      if (readerId !== undefined) {
          const response = await api.put(`/readers/${readerId}`, model)
      } else {
          const response = await api.post('/readers', model)
      }
      back()

  }

  async function findLibrary (libraryId: string) {
      const response = await api.get(`readers/${readerId}`)
      setModel({ 
          email: response.data.email,
          password: response.data.password, 
          nome: response.data.nome,
      }) 
    }

  function back () {
      history.goBack()
  }
  return (
    <div className="container"> 
        <div className='reader-header'> 
            <h1>Cadastro de novo leitor</h1> 
        </div>  
        <div className="container">
                  <Form onSubmit={onSubmit}>
                      <Form.Group> 
                      <Form.Label>E-mail</Form.Label>
                          <Form.Control 
                              type="text" 
                              name="email"
                              value={model.email}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        /> 
                      </Form.Group>  
                      <Form.Group> 
                          <Form.Label>Senha</Form.Label>
                          <Form.Control 
                              type="text" 
                              name="password"
                              value={model.password}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group> 

                     <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group> 
                     
                    <Button variant="dark" type="submit">
                        Cadastrar
                    </Button>
                </Form>
            </div>
    </div>
  );
 } 
  
export default ReadersForm; 