import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addProduct, updateProduct } from '../services/productService';
import Button from '../components/Button';
import { ArrowLeft, Save } from 'lucide-react';

const AdminProductEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(isEditMode);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                const product = await getProductById(id);
                if (product) {
                    setFormData({
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        description: product.description || '',
                        image: product.image
                    });
                }
                setLoading(false);
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isEditMode) {
            await updateProduct(id, formData);
        } else {
            await addProduct(formData);
        }
        setLoading(false);
        navigate('/admin/products');
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

    return (
        <AdminLayout>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <button onClick={() => navigate('/admin/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 style={{ fontSize: '32px' }}>{isEditMode ? 'Edit Product' : 'New Product'}</h1>
                </div>

                <form onSubmit={handleSubmit} style={{ background: 'var(--surface-color)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}
                        >
                            <option value="">Select Category</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Footwear">Footwear</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/image.jpg"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}
                        />
                        {formData.image && (
                            <img src={formData.image} alt="Preview" style={{ marginTop: '12px', width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                        )}
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifySelf: 'end' }}>
                        <Button type="submit" variant="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '150px', justifyContent: 'center' }}>
                            <Save size={18} /> Save Product
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminProductEditor;
