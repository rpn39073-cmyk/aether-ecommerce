import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="wishlist-page">
            <Navbar />
            <div className="container section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
                    <Heart size={32} />
                    <h1 style={{ fontSize: '32px' }}>My Wishlist</h1>
                    <span style={{ fontSize: '18px', opacity: 0.6 }}>({wishlist.length} items)</span>
                </div>

                {wishlist.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '64px 0' }}>
                        <Heart size={64} style={{ opacity: 0.2, marginBottom: '24px' }} />
                        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Your wishlist is empty</h2>
                        <p style={{ opacity: 0.6, marginBottom: '32px' }}>Save items you love to revisit them later.</p>
                        <Link to="/">
                            <Button variant="primary">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="product-grid">
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Wishlist;
