import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();  // Extracting the `id` from useParams correctly
    const [book, setBook] = useState({});
    const API_URL =
        import.meta.env.VITE_NODE_ENV === 'development'
            ? import.meta.env.VITE_API_URL
            : import.meta.env.VITE_API_URL_PROD;

    // Fetching single book details from API
    const getSingleBook = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/book/${id}`);
            setBook(response.data); // Ensure you access the correct data object
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSingleBook();
    }, [id]);



    return (
        <div className="container mt-5">
            <h3>Book Detail</h3>
            <div className="row py-5">
                <div className="col-md-12">

                    <div className="card bg-white p-4">
                        <div className="row">
                            <div className="col-md-4">
                                {/* Book Cover */}
                                <img
                                    src={`${API_URL}/${book.coverUrl}`}
                                    alt={book.title}
                                    className="img-fluid h-100"
                                />
                            </div>
                            <div className="col-md-8">
                                <h2>{book.title}</h2>
                                <p className="text-dark fw-bold">by {book.author}</p>
                                <p className="fs-4">{book.description}</p>
                                <p><strong>Genre:</strong> {book.genre}</p>
                                <p><strong>Upload Date:</strong> {new Date(book.uploadDate).toLocaleDateString()}</p>

                                {/* Buttons for PDF */}
                                <div className="mt-3">
                                    {book.pdfUrl && (
                                        <>
                                            {/* View PDF Button */}
                                            <a
                                                href={`${API_URL}/${book.pdfUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-success me-2"
                                            >
                                                View PDF
                                            </a>

                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
