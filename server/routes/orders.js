import express from 'express';
import { getDbConnection } from '../db.js';

const router = express.Router();

// Create order
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
