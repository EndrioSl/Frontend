import React from 'react'; 
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home'; 
import Books from './pages/Books'; 
import BooksForm from './pages/Books/Form';
import BooksDetail from './pages/Books/Detail';  
import Libraries from './pages/Libraries';
import LibrariesForm from './pages/Libraries/Form';  
import LibraryLogin from './pages/Libraries/Login';    
import ReadersForm from './pages/Readers/Form/Index';

const Routes: React.FC = () => { 
  return ( 
      <Switch> 
          <Route path="/" exact component={Home} />  
          <Route path="/Biblioteca/:libraryId/Livros" exact component={Books} />  
          <Route path="/Livros/:id" exact component={BooksDetail} /> 
          <Route path="/Biblioteca/:libraryId/CadastroLivros" exact component={BooksForm} /> 
          <Route path="/Biblioteca/:libraryId/EditarLivro/:id" exact component={BooksForm} />    
          <Route path="/Bibliotecas" exact component={Libraries} />   
          <Route path="/CadastroBiblioteca" exact component={LibrariesForm} />    
          <Route path="/EditarBiblioteca/:libraryId" exact component={LibrariesForm} />
          <Route path="/LogarBiblioteca" exact component={LibraryLogin} />   
          <Route path="/CadastroLeitor" exact component={ReadersForm} />   
      </Switch> 
  ); 
}   
export default Routes;