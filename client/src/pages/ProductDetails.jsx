import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProducts } from '../services/productService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const { addToCart, setIsCartOpen } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = product ? isInWishlist(product.id) : false;

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            const data = await getProductById(id);
            setProduct(data);

            // Set defaults
            if (data && data.sizes) setSelectedSize(data.sizes[0]);
            if (data && data.colors) setSelectedColor(data.colors[0]);

            // Fetch related products (simulated by category)
            const allProducts = await getProducts();
            const related = allProducts
                .filter(p => p.category === data.category && p.id !== data.id)
                .slice(0, 4);
            setRelatedProducts(related);

            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchProductData();
    }, [id]);

    const handleAddToCart = () => {
        // Create a unique cart item ID based on variations
        // For simplicity in this mock, we just add the base product but normally we'd track variations
        addToCart({
            ...product,
            selectedSize,
            selectedColor
        });
        setIsCartOpen(true);
    };

    if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Product not found</div>;

    return (
        <div className="product-details-page">
            <Navbar />

            <div className="container section" style={{ paddingTop: '120px' }}>
                <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '120px' }}>

                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="main-image-container"
                            style={{ width: '100%', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', background: '#f5f5f5' }}
                        >
                            <img src={product.images ? product.images[activeImage] : product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </motion.div>
                        <div className="thumbnail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                            {product.images && product.images.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    style={{
                                        aspectRatio: '1',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: activeImage === index ? '2px solid var(--text-color)' : '2px solid transparent',
                                        opacity: activeImage === index ? 1 : 0.6
                                    }}
                                >
                                    <img src={img} alt={`${product.name} ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                            <div>
                                <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>{product.name}</h1>
                                <p style={{ fontSize: '24px', fontWeight: '500' }}>${product.price}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Star size={16} fill="var(--text-color)" />
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>4.8</span>
                                <span style={{ fontSize: '14px', opacity: 0.6 }}>(124 reviews)</span>
                            </div>
                        </div>

                        <p style={{ lineHeight: '1.6', opacity: 0.8, marginBottom: '32px' }}>{product.description}</p>

                        {/* Selectors */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Color: <span style={{ opacity: 0.6 }}>{selectedColor}</span></h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {product.colors && product.colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: color.toLowerCase(),
                                            border: selectedColor === color ? '2px solid var(--text-color)' : '1px solid var(--border-color)',
                                            cursor: 'pointer',
                                            padding: '2px',
                                            backgroundClip: 'content-box'
                                        }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Size: <span style={{ opacity: 0.6 }}>{selectedSize}</span></h3>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {product.sizes && product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            padding: '12px 24px',
                                            borderRadius: '4px',
                                            border: '1px solid var(--border-color)',
                                            background: selectedSize === size ? 'var(--text-color)' : 'transparent',
                                            color: selectedSize === size ? 'var(--bg-color)' : 'var(--text-color)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
                            <Button variant="primary" size="large" onClick={handleAddToCart} style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                <ShoppingBag size={20} /> Add to Cart
                            </Button>
                            <button
                                className="btn btn-outline"
                                style={{ padding: '0 24px', borderColor: isWishlisted ? '#ef4444' : 'var(--border-color)', color: isWishlisted ? '#ef4444' : 'inherit' }}
                                onClick={() => toggleWishlist(product)}
                            >
                                <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} />
                            </button>
                        </div>

                        <div style={{ padding: '24px', background: 'var(--surface-color)', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', gap: '32px', fontSize: '14px' }}>
                                <div>
                                    <h4 style={{ marginBottom: '8px' }}>Free Shipping</h4>
                                    <p style={{ opacity: 0.6 }}>On orders over $200</p>
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '8px' }}>Returns</h4>
                                    <p style={{ opacity: 0.6 }}>30-day easy returns</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ marginBottom: '120px', maxWidth: '800px' }}>
                    <h2 className="section-title">Customer Reviews</h2>
                    <div style={{ marginBottom: '48px' }}>
                        <ReviewList reviews={reviews} />
                    </div>
                    <ReviewForm onSubmit={(review) => setReviews([...reviews, review])} />
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="section-title">You Might Also Like</h2>
                    <div className="product-grid">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>

            </div>


        </div >
    );
};

export default ProductDetails;
