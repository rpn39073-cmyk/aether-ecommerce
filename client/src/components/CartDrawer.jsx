import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="overlay"
                        onClick={toggleCart}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 9998
                        }}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '400px',
                            maxWidth: '100%',
                            height: '100%',
                            background: 'var(--bg-color)',
                            zIndex: 9999,
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-4px 0 24px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Shopping Cart</h2>
                            <button onClick={toggleCart}><X size={24} /></button>
                        </div>

                        {cart.length === 0 ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                                <ShoppingBag size={48} style={{ marginBottom: '16px' }} />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    {cart.map(item => (
                                        <div key={item.uniqueId || item.id} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                            <div style={{ width: '80px', height: '100px', flexShrink: 0 }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'flex-start' }}>
                                                    <div>
                                                        <h3 style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.4' }}>{item.name}</h3>
                                                        {(item.selectedSize || item.selectedColor) && (
                                                            <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>
                                                                {item.selectedColor} / {item.selectedSize}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.uniqueId || item.id)} style={{ padding: '4px' }}><X size={16} style={{ opacity: 0.5 }} /></button>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                                    <p style={{ fontSize: '14px', opacity: 0.6 }}>${item.price}</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-color)', borderRadius: '4px', padding: '4px 8px' }}>
                                                        <button onClick={() => updateQuantity(item.uniqueId || item.id, item.quantity - 1)} style={{ padding: '2px' }}><Minus size={12} /></button>
                                                        <span style={{ fontSize: '12px', fontWeight: '500' }}>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.uniqueId || item.id, item.quantity + 1)} style={{ padding: '2px' }}><Plus size={12} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <Link to="/checkout" onClick={toggleCart}>
                                        <Button variant="primary" style={{ width: '100%' }}>Checkout</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
