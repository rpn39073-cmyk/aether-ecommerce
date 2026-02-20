import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo">AETHER</Link>

                <div className="nav-links">
                    <Link to="/shop" className="nav-link">Shop</Link>
                    <Link to="/shop" className="nav-link">Collections</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>

                <div className="nav-actions">
                    <Link to={user ? "/profile" : "/login"} className="icon-btn">
                        <User size={20} />
                    </Link>
                    <Link to="/wishlist" className="icon-btn">
                        <Heart size={20} />
                    </Link>
                    <button className="icon-btn" onClick={() => setIsSearchOpen(true)}><Search size={20} /></button>
                    <button
                        className="icon-btn cart-icon"
                        aria-label="Cart"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
                    </button>
                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-menu"
                        style={{ overflow: 'hidden', background: 'var(--bg-color)', position: 'absolute', top: '100%', left: 0, width: '100%', padding: '0 24px' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
                            <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                            <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
                            <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
                            <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
