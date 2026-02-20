import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="contact-page">
            <Navbar />
            <div className="container section" style={{ paddingTop: '120px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
                >
                    <h1 className="section-title" style={{ fontSize: '48px', marginBottom: '16px' }}>Get in Touch</h1>
                    <p style={{ fontSize: '18px', opacity: 0.7, marginBottom: '48px' }}>
                        Questions about your order, our products, or just want to say hello? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="contact-info">
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Customer Service</h3>
                            <p style={{ opacity: 0.7 }}>support@aether.com</p>
                            <p style={{ opacity: 0.7 }}>+1 (555) 123-4567</p>
                        </div>
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Headquarters</h3>
                            <p style={{ opacity: 0.7 }}>123 Fashion District</p>
                            <p style={{ opacity: 0.7 }}>New York, NY 10012</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Press & Partnerships</h3>
                            <p style={{ opacity: 0.7 }}>press@aether.com</p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ padding: '32px', background: 'var(--surface-color)', borderRadius: '8px', textAlign: 'center' }}
                            >
                                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Message Sent</h3>
                                <p style={{ opacity: 0.7 }}>Thank you for contacting us. We will get back to you shortly.</p>
                                <Button variant="outline" style={{ marginTop: '24px' }} onClick={() => setSubmitted(false)}>Send Another</Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'transparent' }}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'transparent' }}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'transparent', resize: 'vertical' }}
                                ></textarea>
                                <Button type="submit" variant="primary">Send Message</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;
