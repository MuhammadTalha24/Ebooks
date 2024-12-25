import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);  // State for loading indicator
    // const API_URL =
    //     import.meta.env.VITE_NODE_ENV == 'development'
    //         ? import.meta.env.VITE_API_URL
    //         : import.meta.env.VITE_API_URL_PROD;

    const getAllBooks = async () => {
        try {
            const response = await axios.get('https://ebooks-backend-iota.vercel.app//api/v1/book/');
            setBooks(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  // Set loading to false when data is fetched or an error occurs
        }
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-start mb-4">
                    Total Books ({books.length > 0 ? books?.length : ''})
                </h2>

                {loading ? (
                    // Skeleton cards for loading state
                    <div className="row">
                        {[...Array(4)].map((_, index) => (
                            <div className="col-md-3 col-sm-6 mb-4" key={index}>
                                <div className="card bg-white h-100 shadow-sm">
                                    {/* Skeleton for image */}
                                    <div className="card-img-top skeleton-img" style={{ height: '200px' }}></div>
                                    <div className="card-body">
                                        {/* Skeleton for title */}
                                        <div className="skeleton-title mb-2"></div>
                                        {/* Skeleton for author */}
                                        <div className="skeleton-text mb-2"></div>
                                        {/* Skeleton for description */}
                                        <div className="skeleton-text mb-4"></div>
                                        {/* Skeleton for button */}
                                        <div className="skeleton-button"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="row">
                        {books.map((book, index) => (
                            <div className="col-md-3 col-sm-6 mb-4" key={index}>
                                <div className="card bg-white h-100 shadow-sm">
                                    <img
                                        src={`https://ebooks-backend-iota.vercel.app/${book.coverUrl}`}
                                        className="card-img-top"
                                        alt={`${book.title} cover`}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">
                                            <strong>Author:</strong> {book.author}
                                        </p>
                                        <p className="card-text text-muted line-clamp-2">{book.description}</p>
                                        <Link to={`/book_detail/${book._id}`} className="btn btn-dark">
                                            View Book
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </section>
    );
};

export default Books;
