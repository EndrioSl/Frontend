import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { useFormik } from "formik";
import libraryService from "../../../services/libraryService"
import routes from "../../../routes";


interface iLibraryLogin {
    email: string;
    password: string;
}

interface iLibraryLoginRepository {
    id: string;
    email: string;
    nome: string;
} 

const LibraryLogin: React.FC = () => {    

        const history = useHistory()
        const location = useLocation(); 
     
        const onSubmit = async () => {
            const libraryLogin: iLibraryLogin = {
                email: values.email,
                password: values.password 
            }  
            const login = await libraryService.checkLogin(libraryLogin);
    
                if(login) {
                    const libraryLoginRepository: iLibraryLoginRepository = {
                        id: login.id,
                        email: login.email, 
                        nome: login.nome, 
                    }    
                    configureLoginStorage(libraryLoginRepository);    
                    goLibrary(login.id);
                }   
            }  
            
            const configureLoginStorage = (library: iLibraryLoginRepository) => {
                localStorage.clear();
                localStorage.setItem(library.id, String(library.id));
            } 
    
            const initialValues: iLibraryLogin = {
                email: "",
                password: "",
            }
            
            const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
                initialValues,
                //validationSchema: loginSchema,
                onSubmit
            }); 
             
            
            const goLibrary = (id: string) => {
                history.push(`/Biblioteca/${id}/Livros`);
            }

            return (
                <div className="container">
                    <div className='library-header'>
                        <h1>Logar em biblioteca</h1>
                    </div>
                    <div className="container">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={(values.email)} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                    value={(values.password)} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Entrar
                            </Button>
                        </Form>
                    </div>
                </div>
            );
        } 
  
export default LibraryLogin; 