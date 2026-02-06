'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, X, Tag, Check, Percent, DollarSign, Calendar
} from 'lucide-react';
import styles from '../admin.module.css';
import { mockPromotions, Promotion } from '@/data/adminData';

export default function PromotionsPage() {
    const [promosList, setPromosList] = useState<Promotion[]>(mockPromotions);
    const [showModal, setShowModal] = useState(false);
    const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: 'percentage' as 'percentage' | 'fixed',
        discountValue: '',
        minOrderValue: '',
        maxDiscount: '',
        usageLimit: '',
        validFrom: '',
        validUntil: '',
        isActive: true,
    });

    const openAddModal = () => {
        setEditingPromo(null);
        const today = new Date().toISOString().split('T')[0];
        const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        setFormData({
            code: '', description: '', discountType: 'percentage',
            discountValue: '', minOrderValue: '', maxDiscount: '',
            usageLimit: '100', validFrom: today, validUntil: nextMonth, isActive: true,
        });
        setShowModal(true);
    };

    const openEditModal = (promo: Promotion) => {
        setEditingPromo(promo);
        setFormData({
            code: promo.code,
            description: promo.description,
            discountType: promo.discountType,
            discountValue: promo.discountValue.toString(),
            minOrderValue: promo.minOrderValue.toString(),
            maxDiscount: promo.maxDiscount?.toString() || '',
            usageLimit: promo.usageLimit.toString(),
            validFrom: promo.validFrom,
            validUntil: promo.validUntil,
            isActive: promo.isActive,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPromo: Promotion = {
            id: editingPromo?.id || Date.now().toString(),
            code: formData.code.toUpperCase(),
            description: formData.description,
            discountType: formData.discountType,
            discountValue: parseFloat(formData.discountValue),
            minOrderValue: parseFloat(formData.minOrderValue),
            maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined,
            usageLimit: parseInt(formData.usageLimit),
            usedCount: editingPromo?.usedCount || 0,
            isActive: formData.isActive,
            validFrom: formData.validFrom,
            validUntil: formData.validUntil,
        };

        if (editingPromo) {
            setPromosList(prev => prev.map(p => p.id === editingPromo.id ? newPromo : p));
        } else {
            setPromosList(prev => [...prev, newPromo]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this promotion?')) {
            setPromosList(prev => prev.filter(p => p.id !== id));
        }
    };

    const toggleActive = (id: string) => {
        setPromosList(prev => prev.map(p =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1 className={styles.pageTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Promotions
                </motion.h1>
                <p className={styles.pageSubtitle}>Manage promo codes and discounts</p>
            </div>

            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Promotions ({promosList.length})</h2>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={18} /> Add Promo
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Discount</th>
                                <th>Min Order</th>
                                <th>Usage</th>
                                <th>Validity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promosList.map((promo) => (
                                <tr key={promo.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 8,
                                                background: 'hsla(160, 85%, 50%, 0.15)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'var(--color-accent)'
                                            }}>
                                                <Tag size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '1rem' }}>
                                                    {promo.code}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {promo.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                                            {promo.discountType === 'percentage' ? (
                                                <><Percent size={14} /> {promo.discountValue}%</>
                                            ) : (
                                                <><DollarSign size={14} /> ₹{promo.discountValue}</>
                                            )}
                                        </span>
                                        {promo.maxDiscount && (
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                Max: ₹{promo.maxDiscount}
                                            </div>
                                        )}
                                    </td>
                                    <td>₹{promo.minOrderValue}</td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{promo.usedCount} / {promo.usageLimit}</span>
                                            <div style={{
                                                width: 60, height: 4, background: 'var(--color-bg-tertiary)',
                                                borderRadius: 2, marginTop: 4, overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${(promo.usedCount / promo.usageLimit) * 100}%`,
                                                    height: '100%', background: 'var(--color-accent)', borderRadius: 2
                                                }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: '0.875rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Calendar size={12} />
                                            {formatDate(promo.validFrom)}
                                        </div>
                                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                                            to {formatDate(promo.validUntil)}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`${styles.toggle} ${promo.isActive ? styles.active : ''}`}
                                            onClick={() => toggleActive(promo.id)}
                                            title={promo.isActive ? 'Active' : 'Inactive'}
                                        />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.edit}`}
                                                onClick={() => openEditModal(promo)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(promo.id)}
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
                            style={{ maxWidth: 550 }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>
                                    {editingPromo ? 'Edit Promotion' : 'Add New Promotion'}
                                </h3>
                                <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.modalBody}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Promo Code *</label>
                                            <input
                                                type="text"
                                                className={styles.formInput}
                                                style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
                                                placeholder="e.g., SAVE20"
                                                value={formData.code}
                                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Discount Type *</label>
                                            <select
                                                className={`${styles.formInput} ${styles.formSelect}`}
                                                value={formData.discountType}
                                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                                            >
                                                <option value="percentage">Percentage (%)</option>
                                                <option value="fixed">Fixed Amount (₹)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Description *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            placeholder="e.g., 20% off on your first order"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>
                                                {formData.discountType === 'percentage' ? 'Discount (%)' : 'Discount (₹)'} *
                                            </label>
                                            <input
                                                type="number"
                                                className={styles.formInput}
                                                value={formData.discountValue}
                                                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Min Order (₹) *</label>
                                            <input
                                                type="number"
                                                className={styles.formInput}
                                                value={formData.minOrderValue}
                                                onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                                                required
                                            />
                                        </div>
                                        {formData.discountType === 'percentage' && (
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Max Discount (₹)</label>
                                                <input
                                                    type="number"
                                                    className={styles.formInput}
                                                    placeholder="Optional"
                                                    value={formData.maxDiscount}
                                                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Usage Limit *</label>
                                            <input
                                                type="number"
                                                className={styles.formInput}
                                                value={formData.usageLimit}
                                                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Valid From *</label>
                                            <input
                                                type="date"
                                                className={styles.formInput}
                                                value={formData.validFrom}
                                                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Valid Until *</label>
                                            <input
                                                type="date"
                                                className={styles.formInput}
                                                value={formData.validUntil}
                                                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <button
                                                type="button"
                                                className={`${styles.toggle} ${formData.isActive ? styles.active : ''}`}
                                                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                            />
                                            Promotion is active
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <Check size={18} />
                                        {editingPromo ? 'Update' : 'Create'} Promotion
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
