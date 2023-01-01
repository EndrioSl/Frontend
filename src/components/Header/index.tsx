import React from "react";  
import { Container, Nav, Navbar } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
  
const Header: React.FC = () => { 
    return ( 
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid >
                <Navbar.Brand href="">CdB </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0"> 
                        <Nav.Link className='nav-link' as={Link} to="/" >Início</Nav.Link>
                        <Nav.Link className='nav-link' as={Link} to ="/Livros">Livros</Nav.Link>  
                        <Nav.Link className='nav-link' as={Link} to ="/Bibliotecas">Bibliotecas</Nav.Link> 
                        <Nav.Link className='nav-link' as={Link} to ="/CadastroBiblioteca">CBiblioteca</Nav.Link> 
                        <Nav.Link className='nav-link' as={Link} to ="/LogarBiblioteca">LBiblioteca</Nav.Link> 
                        <Nav.Link className='nav-link' as={Link} to ="/CadastroLeitor">CLeitor</Nav.Link>          
                        <Nav.Link className='nav-link' as={Link} to ="/LoginLeitor">LBiblioteca</Nav.Link>                                          
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
} 

export default Header;
