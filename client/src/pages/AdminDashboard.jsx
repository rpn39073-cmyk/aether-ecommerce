import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getProducts } from '../services/productService';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 125430,
        totalOrders: 452,
        totalProducts: 0,
        totalUsers: 890
    });

    useEffect(() => {
        const fetchStats = async () => {
            const products = await getProducts();
            setStats(prev => ({
                ...prev,
                totalProducts: products.length
            }));
        };
        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-color)' }}
        >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} />
            </div>
            <div>
                <p style={{ opacity: 0.6, fontSize: '14px', marginBottom: '4px' }}>{title}</p>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</h3>
            </div>
        </motion.div>
    );

    return (
        <AdminLayout>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Dashboard</h1>
                <p style={{ opacity: 0.6 }}>Welcome back, Admin</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                <StatCard title="Total Sales" value={`$${stats.totalSales.toLocaleString()}`} icon={DollarSign} color="#10b981" />
                <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingBag} color="#3b82f6" />
                <StatCard title="Total Products" value={stats.totalProducts} icon={Package} color="#f59e0b" />
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="#8b5cf6" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                    <div style={{ textAlign: 'center' }}>
                        <TrendingUp size={48} style={{ marginBottom: '16px' }} />
                        <p>Sales Chart Placeholder</p>
                    </div>
                </div>
                <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingBottom: '12px', borderBottom: i < 5 ? '1px solid var(--border-color)' : 'none' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: '500' }}>New Order #ORD-{7800 + i}</p>
                                    <p style={{ fontSize: '12px', opacity: 0.6 }}>2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
import { Package } from 'lucide-react';

export default AdminDashboard;
