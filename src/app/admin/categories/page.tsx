'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Edit2, Trash2, X, Grid3X3, Check
} from 'lucide-react';
import styles from '../admin.module.css';
import { categories as initialCategories, Category } from '@/data/mockData';

export default function CategoriesPage() {
    const [categoriesList, setCategoriesList] = useState<Category[]>(initialCategories);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        productCount: 0,
    });

    const openAddModal = () => {
        setEditingCategory(null);
        setFormData({ name: '', slug: '', description: '', productCount: 0 });
        setShowModal(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description,
            productCount: category.productCount,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCategory: Category = {
            id: editingCategory?.id || Date.now().toString(),
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
            description: formData.description,
            image: editingCategory?.image || '/images/categories/default.jpg',
            productCount: formData.productCount,
        };

        if (editingCategory) {
            setCategoriesList(prev => prev.map(c => c.id === editingCategory.id ? newCategory : c));
        } else {
            setCategoriesList(prev => [...prev, newCategory]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            setCategoriesList(prev => prev.filter(c => c.id !== id));
        }
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1 className={styles.pageTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Categories
                </motion.h1>
                <p className={styles.pageSubtitle}>Organize products into categories</p>
            </div>

            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>All Categories ({categoriesList.length})</h2>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={18} /> Add Category
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Slug</th>
                                <th>Description</th>
                                <th>Products</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoriesList.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 8,
                                                background: 'var(--color-bg-tertiary)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <Grid3X3 size={18} />
                                            </div>
                                            <span style={{ fontWeight: 600 }}>{category.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--color-text-muted)' }}>{category.slug}</td>
                                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {category.description}
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles.info}`}>
                                            {category.productCount} items
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.edit}`}
                                                onClick={() => openEditModal(category)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(category.id)}
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
                                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                                </h3>
                                <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.modalBody}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Category Name *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Slug</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            placeholder="auto-generated from name"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Description</label>
                                        <textarea
                                            className={styles.formInput}
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <Check size={18} />
                                        {editingCategory ? 'Update' : 'Create'} Category
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
