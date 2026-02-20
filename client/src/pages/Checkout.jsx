import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            setLoading(false);
            navigate('/order-success');
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-page">
                <Navbar />
                <div className="container section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h2>Your cart is empty</h2>
                    <Button variant="primary" style={{ marginTop: '24px' }} onClick={() => navigate('/')}>Continue Shopping</Button>
                </div>

            </div>
        );
    }

    return (
        <div className="checkout-page">
            <Navbar />
            <div className="container section">
                <h1 className="section-title">Checkout</h1>
                <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginTop: '32px' }}>

                    {/* Form Section */}
                    <div className="checkout-form-container">
                        <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Shipping Information</h2>
                        <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <input name="firstName" type="text" placeholder="First Name" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                <input name="lastName" type="text" placeholder="Last Name" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                            </div>
                            <input name="email" type="email" placeholder="Email Address" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                            <input name="address" type="text" placeholder="Address" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <input name="city" type="text" placeholder="City" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                <input name="state" type="text" placeholder="State" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                <input name="zip" type="text" placeholder="ZIP Code" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                            </div>

                            <h2 style={{ fontSize: '20px', margin: '24px 0 16px' }}>Payment Details</h2>
                            <input type="text" placeholder="Card Number" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <input type="text" placeholder="MM/YY" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                <input type="text" placeholder="CVC" required style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary" style={{ background: 'var(--surface-color)', padding: '32px', borderRadius: '8px', height: 'fit-content' }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Order Summary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '18px', marginBottom: '24px' }}>
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button type="submit" form="checkout-form" variant="primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Processing...' : 'Place Order'}
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Checkout;
