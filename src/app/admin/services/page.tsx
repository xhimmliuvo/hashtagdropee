'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, X, Wrench, Check, DollarSign
} from 'lucide-react';
import styles from '../admin.module.css';
import { services as initialServices, Service } from '@/data/mockData';

export default function ServicesPage() {
    const [servicesList, setServicesList] = useState<Service[]>(initialServices);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        pricingType: 'fixed' as 'fixed' | 'distance' | 'custom',
        basePrice: '',
    });

    const getPricingLabel = (type: string, basePrice?: number) => {
        switch (type) {
            case 'fixed': return `₹${basePrice || 0} Fixed`;
            case 'distance': return `From ₹${basePrice || 0}`;
            case 'custom': return 'Custom Quote';
            default: return type;
        }
    };

    const openAddModal = () => {
        setEditingService(null);
        setFormData({
            name: '', slug: '', description: '',
            pricingType: 'fixed', basePrice: '',
        });
        setShowModal(true);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            slug: service.slug,
            description: service.description,
            pricingType: service.pricingType,
            basePrice: service.basePrice?.toString() || '',
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newService: Service = {
            id: editingService?.id || Date.now().toString(),
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
            description: formData.description,
            icon: editingService?.icon || 'Package',
            image: editingService?.image || '/images/services/default.jpg',
            pricingType: formData.pricingType,
            basePrice: formData.basePrice ? parseFloat(formData.basePrice) : undefined,
            fields: editingService?.fields || [],
        };

        if (editingService) {
            setServicesList(prev => prev.map(s => s.id === editingService.id ? newService : s));
        } else {
            setServicesList(prev => [...prev, newService]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServicesList(prev => prev.filter(s => s.id !== id));
        }
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1 className={styles.pageTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Services
                </motion.h1>
                <p className={styles.pageSubtitle}>Manage delivery and errand services</p>
            </div>

            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Services ({servicesList.length})</h2>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={18} /> Add Service
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Description</th>
                                <th>Pricing Type</th>
                                <th>Fields</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicesList.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 8,
                                                background: 'hsla(160, 85%, 50%, 0.15)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'var(--color-accent)'
                                            }}>
                                                <Wrench size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{service.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    {service.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {service.description}
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles.accent}`}>
                                            <DollarSign size={12} />
                                            {getPricingLabel(service.pricingType, service.basePrice)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles.info}`}>
                                            {service.fields.length} fields
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.edit}`}
                                                onClick={() => openEditModal(service)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(service.id)}
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
                                    {editingService ? 'Edit Service' : 'Add New Service'}
                                </h3>
                                <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.modalBody}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Service Name *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Description *</label>
                                        <textarea
                                            className={styles.formInput}
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Pricing Type *</label>
                                            <select
                                                className={`${styles.formInput} ${styles.formSelect}`}
                                                value={formData.pricingType}
                                                onChange={(e) => setFormData({ ...formData, pricingType: e.target.value as 'fixed' | 'distance' | 'custom' })}
                                                required
                                            >
                                                <option value="fixed">Fixed Price</option>
                                                <option value="distance">Distance Based</option>
                                                <option value="custom">Custom Quote</option>
                                            </select>
                                        </div>
                                        {formData.pricingType !== 'custom' && (
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Base Price (₹)</label>
                                                <input
                                                    type="number"
                                                    className={styles.formInput}
                                                    value={formData.basePrice}
                                                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <Check size={18} />
                                        {editingService ? 'Update' : 'Create'} Service
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
