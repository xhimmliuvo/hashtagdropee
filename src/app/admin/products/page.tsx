'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, X, Package, Star, Check
} from 'lucide-react';
import styles from '../admin.module.css';
import { products as initialProducts, categories, shops, Product } from '@/data/mockData';

export default function ProductsPage() {
    const [productsList, setProductsList] = useState<Product[]>(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: '',
        discountPrice: '',
        description: '',
        categoryId: '',
        shopId: '',
        availability: true,
    });

    const filteredProducts = productsList.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'N/A';
    const getShopName = (id: string) => shops.find(s => s.id === id)?.name || 'N/A';

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({
            name: '', slug: '', price: '', discountPrice: '',
            description: '', categoryId: categories[0]?.id || '',
            shopId: shops[0]?.id || '', availability: true,
        });
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            slug: product.slug,
            price: product.price.toString(),
            discountPrice: product.discountPrice?.toString() || '',
            description: product.description,
            categoryId: product.categoryId,
            shopId: product.shopId,
            availability: product.availability,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: editingProduct?.id || Date.now().toString(),
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
            price: parseFloat(formData.price),
            discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
            description: formData.description,
            images: editingProduct?.images || ['/images/products/default.jpg'],
            categoryId: formData.categoryId,
            shopId: formData.shopId,
            rating: editingProduct?.rating || 4.5,
            availability: formData.availability,
        };

        if (editingProduct) {
            setProductsList(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
        } else {
            setProductsList(prev => [...prev, newProduct]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProductsList(prev => prev.filter(p => p.id !== id));
        }
    };

    const toggleAvailability = (id: string) => {
        setProductsList(prev => prev.map(p =>
            p.id === id ? { ...p, availability: !p.availability } : p
        ));
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <motion.h1 className={styles.pageTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Products
                </motion.h1>
                <p className={styles.pageSubtitle}>Manage your product catalog</p>
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
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={18} /> Add Product
                    </button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Shop</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 8,
                                                background: 'var(--color-bg-tertiary)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <Package size={18} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{product.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                    {product.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{getCategoryName(product.categoryId)}</td>
                                    <td>{getShopName(product.shopId)}</td>
                                    <td>
                                        <div>
                                            {product.discountPrice && (
                                                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                                                    ₹{product.discountPrice}
                                                </span>
                                            )}
                                            <span style={{
                                                textDecoration: product.discountPrice ? 'line-through' : 'none',
                                                color: product.discountPrice ? 'var(--color-text-muted)' : 'inherit',
                                                marginLeft: product.discountPrice ? 8 : 0,
                                                fontWeight: product.discountPrice ? 400 : 600
                                            }}>
                                                ₹{product.price}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                                            {product.rating}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={`${styles.toggle} ${product.availability ? styles.active : ''}`}
                                            onClick={() => toggleAvailability(product.id)}
                                            title={product.availability ? 'Available' : 'Unavailable'}
                                        />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className={`${styles.actionBtn} ${styles.edit}`}
                                                onClick={() => openEditModal(product)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(product.id)}
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
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.modalBody}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Product Name *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Price (₹) *</label>
                                            <input
                                                type="number"
                                                className={styles.formInput}
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Discount Price (₹)</label>
                                            <input
                                                type="number"
                                                className={styles.formInput}
                                                value={formData.discountPrice}
                                                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                                            />
                                        </div>
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
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Category *</label>
                                            <select
                                                className={`${styles.formInput} ${styles.formSelect}`}
                                                value={formData.categoryId}
                                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                required
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.formLabel}>Shop *</label>
                                            <select
                                                className={`${styles.formInput} ${styles.formSelect}`}
                                                value={formData.shopId}
                                                onChange={(e) => setFormData({ ...formData, shopId: e.target.value })}
                                                required
                                            >
                                                {shops.map(shop => (
                                                    <option key={shop.id} value={shop.id}>{shop.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <button
                                                type="button"
                                                className={`${styles.toggle} ${formData.availability ? styles.active : ''}`}
                                                onClick={() => setFormData({ ...formData, availability: !formData.availability })}
                                            />
                                            Available for orders
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <Check size={18} />
                                        {editingProduct ? 'Update' : 'Create'} Product
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
