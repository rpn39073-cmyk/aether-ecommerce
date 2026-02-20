import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const products = [
        { id: 1, name: "Essential Oversized Tee", price: "45.00", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop" },
        { id: 2, name: "Technical Cargo Pants", price: "120.00", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop" },
        { id: 3, name: "Structure Blazer", price: "250.00", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" },
        { id: 4, name: "Minimalist Hoodie", price: "85.00", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop" }
    ];

    const bestSellers = [
        { id: 5, name: "Signature Cap", price: "35.00", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop" },
        { id: 6, name: "Urban Backpack", price: "140.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop" },
        { id: 7, name: "Layering Vest", price: "95.00", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop" },
        { id: 8, name: "Tech Runner", price: "180.00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" }
    ];

    return (
        <div className="home-page">
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                    alt="Hero Background"
                    className="hero-bg"
                />
                <motion.div
                    className="hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h2 variants={fadeInUp} className="hero-subtitle">Autumn / Winter 2026</motion.h2>
                    <motion.h1 variants={fadeInUp} className="hero-title">Elevate Your Everyday</motion.h1>
                    <motion.div variants={fadeInUp}>
                        <Link to="/shop">
                            <Button variant="primary" size="large">Shop Now</Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Featured Collections */}
            <section className="featured-collections container">
                <motion.div
                    className="collection-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="collection-card">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" alt="Women" className="collection-image" />
                        <div className="collection-info">
                            <h3 className="collection-name">Women</h3>
                            <Link to="/shop">
                                <Button variant="outline" style={{ borderColor: 'white', color: 'white', marginTop: '16px' }}>View Collection</Button>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="collection-card">
                        <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop" alt="Men" className="collection-image" />
                        <div className="collection-info">
                            <h3 className="collection-name">Men</h3>
                            <Link to="/shop">
                                <Button variant="outline" style={{ borderColor: 'white', color: 'white', marginTop: '16px' }}>View Collection</Button>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="collection-card">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" alt="Accessories" className="collection-image" />
                        <div className="collection-info">
                            <h3 className="collection-name">Accessories</h3>
                            <Link to="/shop">
                                <Button variant="outline" style={{ borderColor: 'white', color: 'white', marginTop: '16px' }}>View Collection</Button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* New Arrivals */}
            <section className="product-section container">
                <div className="section-header">
                    <h2 className="section-title">New Arrivals</h2>
                    <Link to="/shop">
                        <Button variant="ghost">View All</Button>
                    </Link>
                </div>
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="product-section container">
                <div className="section-header">
                    <h2 className="section-title">Best Sellers</h2>
                    <Link to="/shop">
                        <Button variant="ghost">View All</Button>
                    </Link>
                </div>
                <div className="product-grid">
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section className="reviews-section">
                <div className="container">
                    <h2 className="section-title">What People Say</h2>
                    <div className="reviews-grid">
                        <motion.div className="review-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <p>"The quality is absolutely unmatched. AETHER has become my go-to for wardrobe essentials."</p>
                            <div className="review-author">Sarah M.</div>
                        </motion.div>
                        <motion.div className="review-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <p>"Minimalist design done right. Shipping was super fast and the packaging felt premium."</p>
                            <div className="review-author">James L.</div>
                        </motion.div>
                        <motion.div className="review-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <p>"I love the sustainable approach and the fit is perfect. Highly recommended!"</p>
                            <div className="review-author">Elena R.</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section container">
                <h2 className="section-title">Stay in the Loop</h2>
                <p style={{ marginTop: '16px', opacity: 0.6 }}>Subscribe for exclusive drops and early access.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Your email address" className="newsletter-input" />
                    <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
            </section>


        </div>
    );
};

export default Home;
