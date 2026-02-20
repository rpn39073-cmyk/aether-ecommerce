import bcrypt from 'bcrypt';
import { getDbConnection } from '../db.js';

export async function seedDatabase() {
    const db = await getDbConnection();

    // Check if admin exists
    const adminExists = await db.get('SELECT * FROM users WHERE email = ?', 'admin@aether.com');
    if (!adminExists) {
        const hashedPw = await bcrypt.hash('admin123', 10);
        await db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Admin User', 'admin@aether.com', hashedPw, 'admin']
        );
        console.log('Admin user seeded.');
    }

    // Check if products exist
    const { count } = await db.get('SELECT COUNT(*) as count FROM products');
    if (count === 0) {
        const stmt = await db.prepare('INSERT INTO products (name, price, description, category, image, colors, sizes, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

        const products = [
            ["Essential Oversized Tee", 45.00, "Heavyweight cotton oversized tee.", "T-Shirts", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000", JSON.stringify(['Black', 'White', 'Sand']), JSON.stringify(['S', 'M', 'L', 'XL']), 100],
            ["Technical Cargo Pants", 120.00, "Water-resistant, multi-pocket cargo pants.", "Bottoms", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000", JSON.stringify(['Black', 'Olive']), JSON.stringify(['S', 'M', 'L', 'XL']), 50],
            ["Structure Blazer", 250.00, "Tailored fit oversized blazer.", "Outerwear", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000", JSON.stringify(['Black', 'Navy']), JSON.stringify(['46', '48', '50', '52']), 30],
            ["Minimalist Hoodie", 85.00, "Premium fleece lined hoodie with hidden pockets.", "Fleece", "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000", JSON.stringify(['Grey', 'Black', 'Cream']), JSON.stringify(['S', 'M', 'L', 'XL']), 80]
        ];

        for (const p of products) {
            await stmt.run(p);
        }
        await stmt.finalize();
        console.log('Sample products seeded.');
    }
}
