import React, { useState, useEffect, ChangeEvent, FormEvent, useRef}from 'react';  
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';   
import api from '../../../shared/services/api'; 
import { FormikErrors } from 'formik';
import { connectStorageEmulator, uploadString } from 'firebase/storage'; 
import * as Photos  from '../../../shared/services/photos';     
import { Photo }  from '../../../shared/types/photo';  
 
interface iBook {  
  isbn: string; 
  title: string; 
  author: string;  
  publisher: string; 
  edition: number;
  topic: string; 
  year_published: number;
  description: string;  
  name_image: string | undefined;
  url: string | undefined;
}
 
interface IParamsProps {
  id: string;  
  libraryId: string;
} 

const Books: React.FC = () => {  
     
  const [uploadString, setUpLoading] = useState(false); 
  const [photos, setPhotos] = useState<Photo[]>([]);   
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      description: '',
      name_image: undefined,
      url: undefined
  })
 
  const [file,setFile] = useState<File | undefined >(undefined);  
   
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const file: File | undefined = files ? files[0] : undefined;

    setFile(file);
  }

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
    
  console.log(file) 
  
  const fileRef = useRef<HTMLInputElement>(null);

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault() 
          
      let name_image: string | undefined; 
      let url: string | undefined;
 
      if(file && file.size > 0) { 
        setUpLoading(true); 
        let result = await Photos.insert(file);
        setUpLoading(false);    
        if (result) {  
          console.log(result)
          name_image = result.name; 
          url = result.image_url; 
        } 
      }  
        
      const newBook: iBook = {
        ...model,
        name_image,
        url,
      }
       
      if (id !== undefined) {
          const response = await api.put(`/books/${id}`, newBook)
      } else {
          const response = await api.post(`/library/${libraryId}/saveBook`, newBook)
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
          description: response.data.description,
          name_image: response.data.name_image,
          url: response.data.url
      })
  }

  function back () {
      history.goBack()
  }

  return (
    <div className="container"> 
        <div className='books-header'>
            <h1>{ id ? 'Editar livro' : 'Cadastrar Livro' }</h1> 
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
                      
                    <Form.Group>
                            <Form.Label>Capa do livro</Form.Label> 
                            <Form.Control    
                            ref={fileRef}
                            type="file" 
                            name="book_image"     
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)} 
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