import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const API_URL =
        import.meta.env.VITE_NODE_ENV == 'development'
            ? import.meta.env.VITE_API_URL
            : import.meta.env.VITE_API_URL_PROD;

    const registerForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/v1/user/register`, {
                name,
                email,
                password,
            });

            toast.success(response.data.message || "Registeration Successfully!")
            setName('');
            setEmail('');
            setPassword('');
            navigate('/login')
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-7">
                    <div className="card bg-white p-4 rounded-3 shadow">
                        <h2 className="text-center fw-bold">Create Your Account</h2>
                        <p className="text-center mb-3">Please Register to continue</p>



                        <form onSubmit={registerForm}>
                            {/* Name */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

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

                            {/* Sign Up Button */}
                            <div className="d-flex justify-content-between mb-3">
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center d-flex align-items-center gap-2">
                                <p className="mb-0">Already have an account?</p>
                                <Link to={'/login'} className="text-secondary mb-0">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
