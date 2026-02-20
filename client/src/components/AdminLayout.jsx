import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Home } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'var(--bg-color)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>AETHER Admin</h2>
                </div>

                <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link
                        to="/admin"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
                            background: isActive('/admin') ? 'var(--surface-color)' : 'transparent',
                            color: isActive('/admin') ? 'var(--text-color)' : 'var(--text-color-secondary)',
                            fontWeight: isActive('/admin') ? '600' : 'normal',
                            textDecoration: 'none'
                        }}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link
                        to="/admin/products"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
                            background: isActive('/admin/products') ? 'var(--surface-color)' : 'transparent',
                            color: isActive('/admin/products') ? 'var(--text-color)' : 'var(--text-color-secondary)',
                            fontWeight: isActive('/admin/products') ? '600' : 'normal',
                            textDecoration: 'none'
                        }}
                    >
                        <Package size={20} /> Products
                    </Link>
                    <Link
                        to="/admin/orders"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
                            background: isActive('/admin/orders') ? 'var(--surface-color)' : 'transparent',
                            color: isActive('/admin/orders') ? 'var(--text-color)' : 'var(--text-color-secondary)',
                            fontWeight: isActive('/admin/orders') ? '600' : 'normal',
                            textDecoration: 'none'
                        }}
                    >
                        <ShoppingCart size={20} /> Orders
                    </Link>
                </nav>

                <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', textDecoration: 'none', color: 'var(--text-color)', marginBottom: '8px', opacity: 0.7 }}>
                        <Home size={20} /> Back to Store
                    </Link>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', width: '100%',
                            background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', borderRadius: '8px',
                            textAlign: 'left', fontSize: '16px'
                        }}
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '250px', padding: '40px', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
