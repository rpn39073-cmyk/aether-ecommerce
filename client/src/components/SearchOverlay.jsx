import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { searchProducts } = useProducts();

    useEffect(() => {
        if (query.length > 0) {
            setResults(searchProducts(query));
        } else {
            setResults([]);
        }
    }, [query, searchProducts]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="search-overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 99999,
                    padding: '40px'
                }}
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '32px', right: '32px', background: 'none', border: 'none', cursor: 'pointer', color: '#111' }}
                >
                    <X size={32} />
                </button>

                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '80px' }}>
                    <div style={{ position: 'relative', marginBottom: '48px', display: 'flex', alignItems: 'center' }}>
                        <Search size={24} style={{ position: 'absolute', left: '16px', color: '#666' }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                            style={{
                                width: '100%',
                                background: '#ffffff',
                                border: '1px solid #e0e0e0',
                                borderRadius: '30px',
                                fontSize: '20px',
                                padding: '16px 16px 16px 56px',
                                outline: 'none',
                                color: '#111111',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#111';
                                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e0e0e0';
                                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                            }}
                        />
                    </div>

                    <div className="search-results">
                        {query && results.length === 0 && (
                            <p style={{ opacity: 0.5, fontSize: '18px', color: '#111' }}>No results found for "{query}"</p>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '32px' }}>
                            {results.map(product => (
                                <Link
                                    to={`/product/${product.id}`}
                                    key={product.id}
                                    onClick={onClose}
                                    style={{ textDecoration: 'none', color: '#111' }}
                                >
                                    <div style={{ marginBottom: '16px', overflow: 'hidden', borderRadius: '8px' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
                                    </div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '500', margin: '8px 0 4px', color: '#111' }}>{product.name}</h4>
                                    <p style={{ color: '#666' }}>${product.price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SearchOverlay;
