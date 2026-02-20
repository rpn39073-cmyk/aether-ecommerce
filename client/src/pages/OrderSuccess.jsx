import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    return (
        <div className="success-page">
            <Navbar />
            <div className="container section" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <CheckCircle size={80} color="var(--accent-color)" style={{ marginBottom: '24px' }} />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontSize: '40px', marginBottom: '16px', fontWeight: '700' }}
                >
                    Order Confirmed!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: '18px', opacity: 0.7, maxWidth: '600px', marginBottom: '48px' }}
                >
                    Thank you for your purchase. We've received your order and sent a confirmation email to you.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link to="/">
                        <Button variant="primary">Continue Shopping</Button>
                    </Link>
                </motion.div>
            </div>

        </div>
    );
};

export default OrderSuccess;
