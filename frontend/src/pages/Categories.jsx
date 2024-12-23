import React from 'react';
import { FaBook, FaLightbulb, FaCode, FaPaintBrush, FaMusic, FaGlobe } from 'react-icons/fa';

const Categories = () => {
    const categories = [
        { name: 'Fiction', icon: <FaBook size={40} /> },
        { name: 'Self-help', icon: <FaLightbulb size={40} /> },
        { name: 'Programming', icon: <FaCode size={40} /> },
        { name: 'Art', icon: <FaPaintBrush size={40} /> },
        { name: 'Music', icon: <FaMusic size={40} /> },
        { name: 'Travel', icon: <FaGlobe size={40} /> },
    ];

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-4">Popular Categories</h2>
                <div className="row">
                    {categories.map((category, index) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={index}>
                            <div className="card text-center shadow-sm h-100">
                                <div className="card-body">
                                    <div className="icon mb-3 text-primary">{category.icon}</div>
                                    <h5 className="card-title">{category.name}</h5>
                                    <p className="card-text">Discover books and resources in {category.name}.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
