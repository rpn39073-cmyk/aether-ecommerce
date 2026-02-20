import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result = await login(email, password);
        setIsLoading(false);
        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.error || 'Failed to login');
        }
    };

    return (
        <div className="login-page">
            <Navbar />
            <div className="container section" style={{ paddingTop: '120px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ width: '100%', maxWidth: '400px', padding: '40px', background: 'var(--surface-color)', borderRadius: '8px' }}
                >
                    <h1 style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h1>
                    <p style={{ textAlign: 'center', marginBottom: '32px', opacity: 0.6 }}>Sign in to continue</p>

                    {error && <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}
                            />
                        </div>
                        <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '8px' }} disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', opacity: 0.7 }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Sign Up</Link>
                    </p>
                </motion.div>
            </div>

        </div>
    );
};

export default Login;
