'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, X, Store, Star, MapPin, Check
} from 'lucide-react';
import styles from '../admin.module.css';
import { shops as initialShops, Shop } from '@/data/mockData';

export default function ShopsPage() {
    const [shopsList, setShopsList] = useState<Shop[]>(initialShops);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        locationTag: '',
        deliveryFee: '',
        estimatedTime: '',
        isActive: true,
    });

    const filteredShops = shopsList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.locationTag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setEditingShop(null);
        setFormData({
            name: '', slug: '', locationTag: '',
            deliveryFee: '', estimatedTime: '30-45 min', isActive: true,
        });
        setShowModal(true);
    };

    const openEditModal = (shop: Shop) => {
        setEditingShop(shop);
        setFormData({
            name: shop.name,
            slug: shop.slug,
            locationTag: shop.locationTag,
            deliveryFee: shop.deliveryFee.toString(),
            estimatedTime: shop.estimatedTime,
            isActive: true,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newShop: Shop = {
            id: editingShop?.id || Date.now().toString(),
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
            logo: editingShop?.logo || '/images/shops/default.jpg',
            rating: editingShop?.rating || 4.5,
            locationTag: formData.locationTag,
            deliveryFee: parseFloat(formData.deliveryFee),
            estimatedTime: formData.estimatedTime,
        };

        if (editingShop) {
            setShopsList(prev => prev.map(s => s.id === editingShop.id ? newShop : s));
        } else {
            setShopsList(prev => [...prev, newShop]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this shop?')) {
            setShopsList(prev => prev.filter(s => s.id !== id));
        }
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1 className={styles.pageTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Shops
                </motion.h1>
                <p className={styles.pageSubtitle}>Manage partner shops and vendors</p>
            </div>

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
                            placeholder="Search shops..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={18} /> Add Shop
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Location</th>
                                <th>Rating</th>
                                <th>Delivery Fee</th>
                                <th>Est. Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShops.map((shop) => (
                                <tr key={shop.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 10,
                                                background: 'var(--gradient-accent)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, fontSize: '1rem', color: 'var(--color-bg-primary)'
                                            }}>
                                                {shop.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{shop.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    {shop.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <MapPin size={14} />
                                            {shop.locationTag}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                                            {shop.rating}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>₹{shop.deliveryFee}</td>
                                    <td style={{ color: 'var(--color-text-muted)' }}>{shop.estimatedTime}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.edit}`}
                                                onClick={() => openEditModal(shop)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(shop.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>
                                    {editingShop ? 'Edit Shop' : 'Add New Shop'}
                                </h3>
                                <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.modalBody}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Shop Name *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Location Tag *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            placeholder="e.g., Thangmeiband, Imphal"
                                            value={formData.locationTag}
                                            onChange={(e) => setFormData({ ...formData, locationTag: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Delivery Fee (₹) *</label>
                                            <input
                                                type="number"
                                                className={styles.formInput}
                                                value={formData.deliveryFee}
                                                onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Estimated Time *</label>
                                            <input
                                                type="text"
                                                className={styles.formInput}
                                                placeholder="e.g., 30-45 min"
                                                value={formData.estimatedTime}
                                                onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <Check size={18} />
                                        {editingShop ? 'Update' : 'Create'} Shop
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
