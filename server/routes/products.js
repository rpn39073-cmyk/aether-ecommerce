import express from 'express';
import { getDbConnection } from '../db.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const db = await getDbConnection();
        const products = await db.all('SELECT * FROM products');

        // Parse JSON strings back to arrays
        const parsedProducts = products.map(p => ({
            ...p,
            colors: p.colors ? JSON.parse(p.colors) : [],
            sizes: p.sizes ? JSON.parse(p.sizes) : []
        }));

        res.json(parsedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server error fetching products' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const db = await getDbConnection();
        const product = await db.get('SELECT * FROM products WHERE id = ?', req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const parsedProduct = {
            ...product,
            colors: product.colors ? JSON.parse(product.colors) : [],
            sizes: product.sizes ? JSON.parse(product.sizes) : []
        };

        res.json(parsedProduct);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Server error fetching product' });
    }
});

export default router;
