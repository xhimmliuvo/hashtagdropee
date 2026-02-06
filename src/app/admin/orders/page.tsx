'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Eye, X, Clock, Package, Truck, CheckCircle, XCircle, MapPin, Phone, User
} from 'lucide-react';
import styles from '../admin.module.css';
import { mockOrders, Order, orderStatusConfig } from '@/data/adminData';

const statusFilters = [
    { key: 'all', label: 'All Orders' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
];

export default function OrdersPage() {
    const [ordersList, setOrdersList] = useState<Order[]>(mockOrders);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = ordersList.filter(o => {
        const matchesSearch = o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrdersList(prev => prev.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ));
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1 className={styles.pageTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Orders
                </motion.h1>
                <p className={styles.pageSubtitle}>Track and manage customer orders</p>
            </div>

            {/* Filter Buttons */}
            <motion.div
                className={styles.filterGroup}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 24 }}
            >
                {statusFilters.map((filter) => (
                    <button
                        key={filter.key}
                        className={`${styles.filterBtn} ${statusFilter === filter.key ? styles.active : ''}`}
                        onClick={() => setStatusFilter(filter.key)}
                    >
                        {filter.label}
                    </button>
                ))}
            </motion.div>

            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.tableHeader}>
                    <div className={styles.searchBar}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search by order ID or customer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
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
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
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
                                            <select
                                                className={`${styles.statusBadge} ${styles[order.status]}`}
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                style={{
                                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                                    padding: '4px 8px', appearance: 'none'
                                                }}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="out_for_delivery">Out for Delivery</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                            {formatDate(order.createdAt)}
                                        </td>
                                        <td>
                                            <button
                                                className={`${styles.actionBtn} ${styles.edit}`}
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Order Detail Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedOrder(null)}
                    >
                        <motion.div
                            className={styles.modal}
                            style={{ maxWidth: 600 }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>
                                    Order {selectedOrder.orderNumber}
                                </h3>
                                <button className={styles.modalClose} onClick={() => setSelectedOrder(null)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                {/* Status */}
                                <div style={{ marginBottom: 24 }}>
                                    <label className={styles.formLabel}>Order Status</label>
                                    <select
                                        className={`${styles.formInput} ${styles.formSelect}`}
                                        value={selectedOrder.status}
                                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="out_for_delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Customer Info */}
                                <div style={{
                                    background: 'var(--color-bg-tertiary)', borderRadius: 12,
                                    padding: 16, marginBottom: 24
                                }}>
                                    <h4 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                                        Customer Details
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <User size={16} /> {selectedOrder.customerName}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Phone size={16} /> {selectedOrder.customerPhone}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                            <MapPin size={16} style={{ marginTop: 2 }} />
                                            {selectedOrder.customerAddress}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div style={{ marginBottom: 24 }}>
                                    <h4 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                                        Order Items
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex', justifyContent: 'space-between',
                                                padding: 12, background: 'var(--color-bg-tertiary)', borderRadius: 8
                                            }}>
                                                <span>
                                                    {item.productName}
                                                    <span style={{ color: 'var(--color-text-muted)', marginLeft: 8 }}>
                                                        x{item.quantity}
                                                    </span>
                                                </span>
                                                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div style={{
                                    borderTop: '1px solid hsla(220, 10%, 50%, 0.1)',
                                    paddingTop: 16
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                        <span>₹{selectedOrder.subtotal}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Delivery Fee</span>
                                        <span>₹{selectedOrder.deliveryFee}</span>
                                    </div>
                                    {selectedOrder.promoDiscount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <span style={{ color: 'var(--color-accent)' }}>Promo Discount</span>
                                            <span style={{ color: 'var(--color-accent)' }}>-₹{selectedOrder.promoDiscount}</span>
                                        </div>
                                    )}
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        paddingTop: 12, borderTop: '1px solid hsla(220, 10%, 50%, 0.1)',
                                        fontSize: '1.125rem', fontWeight: 700
                                    }}>
                                        <span>Total</span>
                                        <span style={{ color: 'var(--color-accent)' }}>₹{selectedOrder.total}</span>
                                    </div>
                                </div>

                                {selectedOrder.notes && (
                                    <div style={{
                                        marginTop: 24, padding: 12,
                                        background: 'hsla(35, 95%, 55%, 0.1)',
                                        borderRadius: 8, borderLeft: '3px solid var(--color-warning)'
                                    }}>
                                        <strong style={{ fontSize: '0.875rem' }}>Notes:</strong>
                                        <p style={{ marginTop: 4, color: 'var(--color-text-secondary)' }}>
                                            {selectedOrder.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
