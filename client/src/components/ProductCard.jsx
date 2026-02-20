import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    return (
        <div className="product-card">
            <div className="product-image-container">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <button
                    className="quick-add-btn"
                    aria-label="Quick Add"
                    onClick={() => addToCart(product)}
                >
                    <Plus size={20} />
                </button>
                <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'var(--surface-color)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <Heart size={18} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : 'currentColor'} />
                </button>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
