'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ShoppingCart, DollarSign, Package, Store, Tag, TrendingUp,
    Clock, CheckCircle, Truck, XCircle, Plus, ArrowRight
} from 'lucide-react';
import styles from './admin.module.css';
import { getDashboardStats, mockOrders, orderStatusConfig } from '@/data/adminData';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.1 },
    },
};

export default function AdminDashboard() {
    const stats = getDashboardStats();
    const recentOrders = mockOrders.slice(0, 5);

    const statsCards = [
        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, type: 'default' },
        { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, type: 'warning' },
        { label: "Today's Revenue", value: `₹${stats.todayRevenue.toLocaleString()}`, icon: TrendingUp, type: 'default' },
        { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, type: 'default' },
        { label: 'Products', value: stats.totalProducts, icon: Package, type: 'info' },
        { label: 'Shops', value: stats.totalShops, icon: Store, type: 'info' },
        { label: 'Active Promos', value: stats.activePromotions, icon: Tag, type: 'default' },
    ];

    const quickActions = [
        { label: 'Add Product', href: '/admin/products?action=add', icon: Package },
        { label: 'Add Shop', href: '/admin/shops?action=add', icon: Store },
        { label: 'New Promo', href: '/admin/promotions?action=add', icon: Tag },
        { label: 'View Orders', href: '/admin/orders', icon: ShoppingCart },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'confirmed':
            case 'preparing': return <Package size={14} />;
            case 'out_for_delivery': return <Truck size={14} />;
            case 'delivered': return <CheckCircle size={14} />;
            case 'cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1
                    className={styles.pageTitle}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Dashboard
                </motion.h1>
                <p className={styles.pageSubtitle}>Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <motion.div
                className={styles.statsGrid}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            className={`${styles.statCard} ${stat.type !== 'default' ? styles[stat.type] : ''}`}
                            variants={fadeInUp}
                        >
                            <div className={styles.statIcon}>
                                <Icon size={24} />
                            </div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                className={styles.quickActions}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <motion.div key={index} variants={fadeInUp}>
                            <Link href={action.href} className={styles.quickActionCard}>
                                <div className={styles.quickActionIcon}>
                                    <Plus size={18} />
                                </div>
                                <span className={styles.quickActionLabel}>{action.label}</span>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Recent Orders Table */}
            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Recent Orders</h2>
                    <Link href="/admin/orders" className="btn btn-secondary">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => {
                                const statusInfo = orderStatusConfig[order.status];
                                return (
                                    <tr key={order.id}>
                                        <td style={{ fontWeight: 600 }}>{order.orderNumber}</td>
                                        <td>
                                            <div>{order.customerName}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                {order.customerPhone}
                                            </div>
                                        </td>
                                        <td>{order.items.length} item(s)</td>
                                        <td style={{ fontWeight: 600 }}>₹{order.total}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                                                {getStatusIcon(order.status)}
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--color-text-muted)' }}>
                                            {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
