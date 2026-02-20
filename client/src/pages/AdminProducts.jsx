import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getProducts, deleteProduct } from '../services/productService';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../components/Button';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const success = await deleteProduct(id);
            if (success) {
                setProducts(products.filter(p => p.id !== id));
            }
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AdminLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px' }}>Products</h1>
                <Link to="/admin/products/new">
                    <Button variant="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} /> Add Product
                    </Button>
                </Link>
            </div>

            <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
                <Search size={20} style={{ opacity: 0.5 }} />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'var(--text-color)', fontSize: '16px' }}
                />
            </div>

            <div style={{ background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Product</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Category</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Price</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" style={{ padding: '32px', textAlign: 'center' }}>Loading products...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: '32px', textAlign: 'center' }}>No products found</td></tr>
                        ) : (
                            filteredProducts.map(product => (
                                <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <span style={{ fontWeight: '500' }}>{product.name}</span>
                                    </td>
                                    <td style={{ padding: '16px' }}>{product.category}</td>
                                    <td style={{ padding: '16px' }}>${product.price}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <Link to={`/admin/products/edit/${product.id}`}>
                                                <button style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer', color: 'var(--text-color)' }}>
                                                    <Edit size={16} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#fee2e2', cursor: 'pointer', color: '#ef4444' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminProducts;
