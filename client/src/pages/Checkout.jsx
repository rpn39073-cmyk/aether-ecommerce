import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createOrder, createRazorpayOrder } from '../services/orderService';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth(); // Assume we have user from context

    // Add Razorpay Script dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Get FormData
            const form = document.getElementById('checkout-form');
            const formData = new FormData(form);
            const shippingData = Object.fromEntries(formData.entries());
            const shippingName = `${shippingData.firstName} ${shippingData.lastName}`;
            const shippingAddress = `${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.zip}`;

            // 2. Create Razorpay Order from Backend
            const rzpOrder = await createRazorpayOrder(cartTotal);

            // 3. Initialize Razorpay popup
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_zHlO3jN2tQ4cTt', // Test Key
                amount: rzpOrder.amount,
                currency: 'INR',
                name: 'AETHER Premium Clothing',
                description: 'Order Checkout',
                order_id: rzpOrder.id,
                handler: async function (response) {
                    // Payment successful, now save order in DB
                    try {
                        await createOrder({
                            userId: user?.id || null, // Guest if no user
                            total: cartTotal,
                            shippingName,
                            shippingAddress,
                            items: cart
                        });
                        clearCart();
                        setLoading(false);
                        navigate('/order-success');
                    } catch (err) {
                        alert('Error saving order: ' + err.message);
                        setLoading(false);
                    }
                },
                prefill: {
                    name: shippingName,
                    email: shippingData.email,
                },
                theme: { color: '#0a0a0a' }
            };

            const rzp = new window.Razorpay(options);

            rzp.on('payment.failed', function (response) {
                alert('Payment failed: ' + response.error.description);
                setLoading(false);
            });

            rzp.open();

        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment.');
            setLoading(false);
        }
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
                        <form id="checkout-form" onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
