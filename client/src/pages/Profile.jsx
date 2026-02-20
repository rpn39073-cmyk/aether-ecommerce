import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { Package, User, LogOut, MapPin } from 'lucide-react';

const Profile = () => {
    const { user, logout, loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading || !user) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    const mockOrders = [
        { id: '#ORD-7829', date: 'Oct 24, 2026', status: 'Delivered', total: '$165.00', items: 2 },
        { id: '#ORD-7811', date: 'Sep 12, 2026', status: 'Delivered', total: '$85.00', items: 1 },
    ];

    return (
        <div className="profile-page">
            <Navbar />
            <div className="container section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
                <div className="profile-header">
                    <div className="profile-user-info">
                        <div className="profile-avatar">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Hello, {user.name}</h1>
                            <p style={{ opacity: 0.6 }}>{user.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>
                        <LogOut size={16} style={{ marginRight: '8px' }} /> Sign Out
                    </Button>
                </div>

                <div className="profile-grid">
                    <div className="profile-sidebar">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`profile-menu-btn ${activeTab === 'orders' ? 'active' : ''}`}
                            style={{ width: '100%' }}
                        >
                            <Package size={20} /> Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('address')}
                            className={`profile-menu-btn ${activeTab === 'address' ? 'active' : ''}`}
                            style={{ width: '100%' }}
                        >
                            <MapPin size={20} /> Addresses
                        </button>
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`profile-menu-btn ${activeTab === 'account' ? 'active' : ''}`}
                            style={{ width: '100%' }}
                        >
                            <User size={20} /> Account Details
                        </button>
                    </div>

                    <div className="profile-content">
                        {activeTab === 'orders' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Order History</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {mockOrders.map(order => (
                                        <div key={order.id} className="order-card">
                                            <div>
                                                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{order.id}</h3>
                                                <p style={{ opacity: 0.6, fontSize: '14px' }}>{order.date} • {order.items} Items</p>
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{order.total}</p>
                                                <span style={{ padding: '4px 8px', background: 'rgba(50, 205, 50, 0.1)', color: '#32cd32', borderRadius: '4px', fontSize: '12px' }}>{order.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'address' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Saved Addresses</h2>
                                <div className="address-card">
                                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Default Address</h3>
                                    <p style={{ opacity: 0.7, lineHeight: '1.6' }}>
                                        {user.name}<br />
                                        123 Fashion District<br />
                                        New York, NY 10012<br />
                                        United States
                                    </p>
                                    <div style={{ marginTop: '16px' }}>
                                        <Button variant="outline" size="small">Edit</Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'account' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Account Details</h2>
                                <p style={{ opacity: 0.7 }}>Email: {user.email}</p>
                                <p style={{ opacity: 0.7, marginTop: '8px' }}>Password: *********</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;
