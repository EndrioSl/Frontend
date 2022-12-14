import React, { useState, useEffect, ChangeEvent  }from 'react';  
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';  
import api from '../../../shared/services/api';   

interface iLibrary {  
  email: string; 
  password: string; 
  nome: string;   
}
 
interface IParamsProps {
  libraryId: string;
} 

const LibrariesForm: React.FC = () => {  
   
  const history = useHistory()
  const { libraryId } = useParams<IParamsProps>();
  const [model, setModel] = useState<iLibrary>({ 
      email: '',
      password: '', 
      nome: ''
  })

  useEffect(() => {
      if (libraryId !== undefined) {
          findLibrary(libraryId)
      }
  }, [libraryId])

  function updatedModel (e: ChangeEvent<HTMLInputElement>) {

      setModel({
          ...model,
          [e.target.name]: e.target.value
      })
 
  } 
   

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
 
      console.log('if',libraryId);
      if (libraryId !== undefined) {
          const response = await api.put(`/libraries/${libraryId}`, model)
      } else {
          const response = await api.post('/libraries', model)
      }
      back()

  }

  async function findLibrary (libraryId: string) {
      const response = await api.get(`libraries/${libraryId}`)
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
        <div className='library-header'> 
            <h1>Cadastro Biblioteca</h1> 
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
                        Salvar
                    </Button>
                </Form>
            </div>
    </div>
  );
 } 
  
export default LibrariesForm; 