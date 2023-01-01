import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { useFormik } from "formik";
import readerService from "../../../services/readerService"
import routes from "../../../routes";


interface iReaderLogin {
    email: string;
    password: string;
}

interface iReaderLoginRepository {
    id: string;
    email: string;
    nome: string;
} 

const ReaderLogin: React.FC = () => {    

        const history = useHistory()
        const location = useLocation(); 
     
        const onSubmit = async () => {
            const readerLogin: iReaderLogin = {
                email: values.email,
                password: values.password 
            }  
            const login = await readerService.checkLogin(readerLogin);
    
                if(login) {
                    const readerLoginRepository: iReaderLoginRepository = {
                        id: login.id,
                        email: login.email, 
                        nome: login.nome, 
                    }    
                    configureLoginStorage(readerLoginRepository);    
                    goLibraries(login.id);
                }   
            }  
            
            const configureLoginStorage = (reader: iReaderLoginRepository) => {
                localStorage.clear();
                localStorage.setItem(reader.id, String(reader.id));
            } 
    
            const initialValues: iReaderLogin = {
                email: "",
                password: "",
            }
            
            const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
                initialValues,
                //validationSchema: loginSchema,
                onSubmit
            }); 
             
            
            const goLibraries = (id: string) => {
                history.push(`/Bibliotecas`);
            }

            return (
                <div className="container">
                    <div className='reader-header'>
                        <h1>Login Leitor</h1>
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
  
export default ReaderLogin; 