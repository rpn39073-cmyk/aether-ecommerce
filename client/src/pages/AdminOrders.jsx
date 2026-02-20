import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Search, Eye, MoreHorizontal, Loader2 } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../services/orderService';
import { useToast } from '../context/ToastContext';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                addToast('Failed to load orders', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [addToast]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateOrderStatus(id, newStatus);
            setOrders(orders.map(order =>
                order.id === id ? { ...order, status: newStatus } : order
            ));
            addToast('Order status updated', 'success');
        } catch (err) {
            addToast(err.message || 'Failed to update order status', 'error');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return { bg: '#fff7ed', color: '#c2410c' };
            case 'Processing': return { bg: '#eff6ff', color: '#1d4ed8' };
            case 'Shipped': return { bg: '#f0f9ff', color: '#0369a1' };
            case 'Delivered': return { bg: '#f0fdf4', color: '#15803d' };
            default: return { bg: '#f3f4f6', color: '#374151' };
        }
    };

    return (
        <AdminLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px' }}>Orders</h1>
            </div>

            <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
                <Search size={20} style={{ opacity: 0.5 }} />
                <input
                    type="text"
                    placeholder="Search orders..."
                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'var(--text-color)', fontSize: '16px' }}
                />
            </div>

            <div style={{ background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Order ID</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Customer</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Items</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Total</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '16px', opacity: 0.6, fontWeight: '500', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            const statusStyle = getStatusColor(order.status);
                            return (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '16px', fontWeight: '500' }}>#ORD-{order.id}</td>
                                    <td style={{ padding: '16px' }}>{order.shippingName || order.customerEmail || 'Guest'}</td>
                                    <td style={{ padding: '16px', opacity: 0.7 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px' }}>{order.itemsCount}</td>
                                    <td style={{ padding: '16px', fontWeight: '500' }}>${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</td>
                                    <td style={{ padding: '16px' }}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{
                                                background: statusStyle.bg,
                                                color: statusStyle.color,
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer', color: 'var(--text-color)' }}>
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
