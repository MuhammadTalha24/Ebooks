import axios from 'axios';
import React from 'react';
import { FaBook } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Navbar = () => {
    const API_URL =
        import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_API_URL
            : import.meta.env.VITE_API_URL_PROD;
    const handleLogout = async () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');

        try {
            const response = await axios.get(`${API_URL}/api/v1/user/logout`, {
                withCredentials: true, // This ensures the cookies are sent with the request
            });

            toast.success(response.data.message || "Logout Successfully!");
            window.location.reload(); // Reload to update the navbar
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const adminEmail = 'koech3659@gmail.com'
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
            <div className="container">
                <Link to={'/'} className="navbar-brand text-primary d-flex algin-items-center gap-2" href="#"><FaBook className='fs-2' /> EzraKipsstra</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">

                        {user?.email == adminEmail && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/ebooks">Explore Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                        </li>

                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-muted">Hello, <strong>{user?.name}</strong></span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-dark" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>


                </div>
            </div>
        </nav>
    );
}

export default Navbar;
