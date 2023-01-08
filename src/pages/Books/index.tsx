import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Container, Form, Col, Row, Badge, Button, Card, ProgressBar, Alert, Pagination } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import api from '../../shared/services/api';
import { BookHeader, AllBookCards, Loading } from './styles';
import { BsFillPencilFill, BsBookmarkPlusFill, BsTrashFill } from "react-icons/bs";
import { Photo } from '../../shared/types/photo';
import * as Photos from '../../shared/services/photos';
import "./styles.css";

interface iBook {
    id: number;
    title: string;
    author: string;
    isbn: string;
    status: boolean;
    url: string;
}

interface IParamsProps {
    libraryId: string;
}

const Detail: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalBooks, setTotalBooks] = useState(0);
    const [bookPerPage, setBookPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    useState(() => {
        const getPhotos = async () => {
            setLoading(true);
            setPhotos(await Photos.getAll());
            setLoading(false);
        }
        getPhotos();
    })

    const [searchBook, setSearchBook] = useState<string>('');
    const [books, setBooks] = useState<iBook[]>([]);

    useEffect(() => {

        if (searchBook.length === 0) {
            loadBooks(libraryIdNumber)
            return;
        }
        if (searchBook.length > 0) {
            const updatedSearch = async () => {
                const fetchBooks = await getSearchBook(searchBook);
                setBooks(fetchBooks);
            }
            updatedSearch();
            return;
        }
    }, [searchBook]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchBook(event.target.value);
    }

    const getSearchBook = async (name: string): Promise<iBook[]> => {
        const { data } = await api.get(`/library/${libraryId}/books/search/?name=${name}`);

        setLoading(false);
        return data;
    }

    const history = useHistory()
    const { libraryId } = useParams<IParamsProps>();
    const libraryIdNumber = Number(libraryId);

    async function loadBooks(libraryId: number) {
        const { data } = await api.get(`/library/${libraryId}/books`);
        setBooks(data);
    }

    function newBooks() {
        history.push(`/Biblioteca/${libraryId}/CadastroLivros`)
    }

    function editBook(id: number) {
        history.push(`/Biblioteca/${libraryId}/EditarLivro/${id}`)
    }

    async function statusBook(id: number) {
        await api.patch(`/books/${id}`)
        loadBooks(libraryIdNumber)
    }

    async function deleteBook(id: number) {
        await api.delete(`/books/${id}`)
        loadBooks(libraryIdNumber);
    }

    function viewBook(id: number) {
        history.push(`/Livros/${id}`)
    }

    function editLibraries() {
        history.push(`/EditarBiblioteca/${libraryId}`)
    }
 
    function viewReaders() {
        history.push(`/Biblioteca/${libraryId}/Leitores`);
    } 

    const indexOfLastBook = currentPage * bookPerPage;
    const indexOfFirstBook = indexOfLastBook - bookPerPage;

    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <Container className="text-center">
            <BookHeader>
                <h1>Livros Registrados</h1> 
                <Button size="sm" variant="success" onClick={viewReaders}> Leitores </Button>
                <Button variant='dark' size='sm' onClick={newBooks}>Novo livro</Button>
            </BookHeader>
            <Form style={{ margin: '1% 0 1% 0' }}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="searchBook"
                        placeholder="Pesquise seu livro"
                        value={searchBook}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Row md='5'>
                {
                    currentBooks.map(book => (
                        <Col key={book.id} style={{ height: '20rem', marginBottom: '1rem' }}>
                            <Card className="text-center">
                                <Card.Header style={{ height: '17rem', padding: '3%' }}>
                                    <Card.Img variant="top" src={book.url} style={{ height: '100%', width: '70%', objectFit: 'contain' }} />
                                </Card.Header>
                                <Card.Body className="justify-content-center" style={{ height: '4rem', padding: '3%' }}>
                                    <Card.Title style={{ fontSize: '1.25ren', maxWidth: '100%', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}> {book.title} </Card.Title>
                                    <Card.Subtitle> {book.author} </Card.Subtitle>
                                </Card.Body>
                                <Card.Footer>
                                    <Button size="sm" variant="success" onClick={() => statusBook(book.id)}> Status </Button>{' '}
                                    <Button size="sm" variant="link" /*disabled={book.status}*/ onClick={() => editBook(book.id)}><BsFillPencilFill /></Button  >{' '}
                                    <Button size="sm" variant="link" onClick={() => viewBook(book.id)}> <BsBookmarkPlusFill /> </Button>{' '}
                                    <Button size="sm" variant="link" onClick={() => deleteBook(book.id)}> <BsTrashFill /> </Button>{' '}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <div className='pagination'>

            </div>
            {books.length < 1 && (
                <Alert variant="danger">
                    Não há nenhum livro com essas informações
                </Alert>
            )}
            <Button variant='dark' size='sm' onClick={editLibraries}>EditarBiblioteca</Button>
        </Container>
    );
}

export default Detail; 