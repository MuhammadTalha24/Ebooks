import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const TrendingBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);  // State for loading indicator
    const API_URL =
        import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_API_URL
            : import.meta.env.VITE_API_URL_PROD;

    const getAllBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/book/`);
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


    const onlyFourBooks = books.slice(0, 4)


    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-4">Trending Books</h2>
                <div className="row">
                    {onlyFourBooks.map((book, index) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={index}>
                            <div className="card bg-white h-100 shadow-sm">
                                <img
                                    src={`${API_URL}/${book.coverUrl}`}
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
                    {
                        onlyFourBooks == 0 && (
                            <h1 className='text-center'>
                                No Book Available
                            </h1>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default TrendingBooks;
