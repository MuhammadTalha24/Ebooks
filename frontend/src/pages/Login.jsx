import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const API_URL =
        import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_API_URL
            : import.meta.env.VITE_API_URL_PROD;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/user/login`,
                { email, password },
                { withCredentials: true }  // Add this line to send cookies
            );

            localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success(response.data.message || "Login Successfully!");
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-7">

                    <div className="card bg-white p-4 rounded-3">
                        <h2 className="text-center fw-bold">Welcome Back</h2>
                        <p className="text-center mb-3">Please login to continue</p>
                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Login Button */}
                            <div className="d-flex justify-content-between mb-3">
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>Login</button>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-center d-flex align-items-center gap-2">
                                <p className='mb-0'>Dont have an account?</p> <Link to={'/register'} className="text-secondary mb-0">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login