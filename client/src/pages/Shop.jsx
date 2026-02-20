import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

const Shop = () => {
    const { products, loading } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories", "Footwear"];

    useEffect(() => {
        if (activeCategory === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === activeCategory));
        }
    }, [products, activeCategory]);

    return (
        <div className="shop-page">
            <Navbar />
            <div className="container section" style={{ paddingTop: '120px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                    <h1 className="section-title">Shop Collection</h1>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
                    >
                        <Filter size={16} /> Filters
                    </button>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', marginBottom: '32px' }}
                        >
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingBottom: '16px' }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: '1px solid var(--border-color)',
                                            background: activeCategory === cat ? 'var(--text-color)' : 'transparent',
                                            color: activeCategory === cat ? 'var(--bg-color)' : 'var(--text-color)',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '64px' }}>Loading products...</div>
                ) : (
                    <div className="product-grid" style={{ minHeight: '50vh' }}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {filteredProducts.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '64px', opacity: 0.6 }}>No products found in this category.</div>
                )}
            </div>

        </div>
    );
};

export default Shop;
