import React from 'react'; 
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home'; 
import Books from './pages/Books'; 
import BooksForm from './pages/Books/Form';
import BooksDetail from './pages/Books/Detail'; 
import Libraries from './pages/Libraries/Form';  
import LibraryLogin from './pages/Libraries/Login';  

const Routes: React.FC = () => { 
  return ( 
      <Switch> 
          <Route path="/" exact component={Home} />  
          <Route path="/Livros" exact component={Books} />  
          <Route path="/Livros/:id" exact component={BooksDetail} /> 
          <Route path="/CadastroLivros" exact component={BooksForm} /> 
          <Route path="/CadastroLivros/:id" exact component={BooksForm} />  
          <Route path="/Bibliotecas" exact component={Libraries} />   
          <Route path="/LogarBiblioteca" exact component={LibraryLogin} />  
      </Switch> 
  ); 
}   
export default Routes;