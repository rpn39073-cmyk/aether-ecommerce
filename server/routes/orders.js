import express from 'express';
import { getDbConnection } from '../db.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Initialize Razorpay with public test keys (Fallback to env if provided)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_zHlO3jN2tQ4cTt',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'gqF9G7lD0l5hB0a9A9A9A9A9', // Dummy secret fallback
});

// GET all orders for Admin Panel
router.get('/', async (req, res) => {
    try {
        const db = await getDbConnection();
        // Fetch orders and count items
        const orders = await db.all(`
            SELECT o.*, u.email as customerEmail, 
                   (SELECT COUNT(*) FROM order_items WHERE orderId = o.id) as itemsCount
            FROM orders o
            LEFT JOIN users u ON o.userId = u.id
            ORDER BY o.createdAt DESC
        `);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error fetching orders' });
    }
});

// PUT update order status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const db = await getDbConnection();
        await db.run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Server error updating order status' });
    }
});

// Create Razorpay Order (Step 1)
router.post('/razorpay/create', async (req, res) => {
    try {
        const { amount } = req.body; // Amount in USD or INR

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in smallest currency unit (paise/cents)
            currency: 'INR', // Defaulting to INR for UPI processing
            receipt: 'receipt_order_' + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Razorpay Order error:', error);
        res.status(500).json({ error: 'Failed to initiate Razorpay order' });
    }
});

// Standard Checkout (or Razorpay success fallback)
router.post('/', async (req, res) => {
    try {
        const { userId, total, shippingName, shippingAddress, items } = req.body;
        const db = await getDbConnection();

        // 1. Insert Order
        const orderResult = await db.run(
            'INSERT INTO orders (userId, total, shippingName, shippingAddress) VALUES (?, ?, ?, ?)',
            [userId || null, total, shippingName, shippingAddress]
        );
        const orderId = orderResult.lastID;

        // 2. Insert Order Items
        const stmt = await db.prepare('INSERT INTO order_items (orderId, productId, quantity, price, color, size) VALUES (?, ?, ?, ?, ?, ?)');
        for (const item of items) {
            await stmt.run([orderId, item.id, item.quantity, item.price, item.selectedColor, item.selectedSize]);
        }
        await stmt.finalize();

        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Server error creating order' });
    }
});

export default router;
