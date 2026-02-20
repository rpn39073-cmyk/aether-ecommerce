import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>AETHER</h3>
                        <p>Redefining modern streetwear with premium materials and minimalist aesthetics.</p>
                    </div>
                    <div>
                        <h3>Shop</h3>
                        <div className="footer-links">
                            <Link to="/shop" className="footer-link">New Arrivals</Link>
                            <Link to="/shop" className="footer-link">Best Sellers</Link>
                            <Link to="/shop" className="footer-link">Accessories</Link>
                            <Link to="/shop" className="footer-link">Sale</Link>
                        </div>
                    </div>
                    <div>
                        <h3>Support</h3>
                        <div className="footer-links">
                            <Link to="/contact" className="footer-link">FAQ</Link>
                            <Link to="/contact" className="footer-link">Shipping & Returns</Link>
                            <Link to="/contact" className="footer-link">Size Guide</Link>
                            <Link to="/contact" className="footer-link">Contact Us</Link>
                        </div>
                    </div>
                    <div>
                        <h3>Connect</h3>
                        <div className="footer-links social-links">
                            <a href="#" className="footer-link"><Instagram size={20} /> Instagram</a>
                            <a href="#" className="footer-link"><Twitter size={20} /> Twitter</a>
                            <a href="#" className="footer-link"><Facebook size={20} /> Facebook</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 AETHER. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
