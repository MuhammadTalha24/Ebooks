import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('allBooks');
    const [books, setBooks] = useState([]);

    const API_URL =
        import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_API_URL
            : import.meta.env.VITE_API_URL_PROD;

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
    });
    const [pdf, setPdf] = useState(null);
    const [cover, setCover] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBookData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        if (id === 'bookPDF') setPdf(files[0]);
        if (id === 'bookCover') setCover(files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('description', bookData.description);
        formData.append('genre', bookData.genre);
        formData.append('pdf', pdf);
        formData.append('cover', cover);

        try {
            const response = await axios.post(`${API_URL}/api/v1/book/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            toast.success(response.data.message);
            setActiveTab('allBooks');
            getAllBooks();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding book');
        }
    };







    const getAllBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/book/`);
            setBooks(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBook = async (id) => {
        const response = await axios.delete(`${API_URL}/api/v1/book/${id}`, { withCredentials: true })
        toast.success(response.data.message);
        getAllBooks()
    }

    useEffect(() => {
        getAllBooks()
    }, [activeTab])

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Dashboard</h1>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'allBooks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('allBooks')}
                    >
                        All Books
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'addBook' ? 'active' : ''}`}
                        onClick={() => setActiveTab('addBook')}
                    >
                        Add Book
                    </button>
                </li>
            </ul>
            <div className="card bg-white rounded-2 my-5 p-4">

                <div className="tab-content">
                    {activeTab === 'allBooks' && (
                        <div>
                            <h2 className='mb-3'>All Books</h2>
                            <table className="table table-bordered table-hover table-responsive">
                                <thead className='table-dark'>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Description</th>
                                        <th>Genre</th>
                                        <th>PDF</th>
                                        <th>Cover</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={index}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.description}</td>
                                            <td>{book.genre}</td>
                                            <td><a href={`${API_URL}/${book.pdfUrl}`} target="_blank" rel="noopener noreferrer">View PDF</a></td>
                                            <td><img src={`${API_URL}/${book.coverUrl}`} alt={book.title} style={{ width: '50px' }} /></td>
                                            <td className='align-middle text-center'><a style={{ cursor: "pointer" }} onClick={() => deleteBook(book._id)} className='text-danger me-2'><FaTrash /></a> <Link to={`/admin/edit/${book._id}`}><FaPencilAlt /></Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'addBook' && (
                        <div>
                            <h2>Add Book</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Book Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={bookData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter book title"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        value={bookData.author}
                                        onChange={handleInputChange}
                                        placeholder="Enter author name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        value={bookData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter book description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genre" className="form-label">Genre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="genre"
                                        value={bookData.genre}
                                        onChange={handleInputChange}
                                        placeholder="Enter book genre"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bookPDF" className="form-label">Upload PDF</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="bookPDF"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bookCover" className="form-label">Upload Cover</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="bookCover"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Book</button>
                            </form>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
