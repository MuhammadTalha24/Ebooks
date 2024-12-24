import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditBook = () => {
    const { id } = useParams(); // Get book ID from the URL params
    const navigate = useNavigate(); // For navigating back after editing

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
    const [pdf, setPdfFile] = useState(null);
    const [cover, setCoverFile] = useState(null);

    // Fetch the current book data
    useEffect(() => {
        const getBookData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/book/${id}`);

                setBookData({
                    title: response.data.title,
                    author: response.data.author,
                    description: response.data.description,
                    genre: response.data.genre,
                });
            } catch (error) {
                toast.error('Error fetching book data');
            }
        };
        getBookData();
    }, [id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBookData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleFileChange = (e) => {
        const { id, files } = e.target;
        if (id === 'editBookPDF') setPdfFile(files[0]);
        if (id === 'editBookCover') setCoverFile(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('description', bookData.description);
        formData.append('genre', bookData.genre);
        if (pdf) formData.append('pdf', pdf);
        if (cover) formData.append('cover', cover);

        try {
            const response = await axios.put(`${API_URL}/api/v1/book/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            toast.success(response.data.message);
            navigate('/admin'); // Redirect to the admin dashboard
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating book');
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <div className="card bg-white rounded-2">
                        <div className="card-body">
                            <h1>Edit Book</h1>
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
                                    <label htmlFor="editBookPDF" className="form-label">Upload New PDF</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="editBookPDF"
                                        onChange={handleFileChange}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editBookCover" className="form-label">Upload New Cover</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="editBookCover"
                                        onChange={handleFileChange}
                                    />

                                </div>
                                <button type="submit" className="btn btn-primary">Update Book</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
