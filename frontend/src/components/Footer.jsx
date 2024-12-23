import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-dark pb-4 pt-5">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-md-4 mb-4">
                        <h5>EzraKipsstra</h5>
                        <p>
                            EzraKipsstra is your ultimate destination for exploring and enjoying books online. Discover
                            a wide range of genres and indulge in your passion for reading.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to={'/'} className="text-dark text-decoration-none">Home</Link></li>
                            <li><Link to={'/ebooks'} className="text-dark text-decoration-none">Explore Books</Link></li>
                            <li><Link to={'/categories'} className="text-dark text-decoration-none">Categories</Link></li>

                        </ul>
                    </div>
                    {/* Social Media */}
                    <div className="col-md-4 mb-4">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://facebook.com" className="text-dark me-3">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="text-dark me-3">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://instagram.com" className="text-dark me-3">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com" className="text-dark">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="border-dark" />
                <div className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} EzraKipsstra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
