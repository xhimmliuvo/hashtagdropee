'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Star, MapPin, Clock, Truck, Package, Plus
} from 'lucide-react';
import styles from './shopDetail.module.css';
import { shops, products, categories, Product } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

interface ShopDetailClientProps {
    slug: string;
}

export default function ShopDetailClient({ slug }: ShopDetailClientProps) {
    const { addItem } = useCart();
    const shop = shops.find((s) => s.slug === slug);

    if (!shop) {
        return (
            <div className={styles.notFound}>
                <h1>Shop not found</h1>
                <Link href="/shops" className="btn btn-primary">
                    Browse Shops
                </Link>
            </div>
        );
    }

    const shopProducts = products.filter((p) => p.shopId === shop.id);

    return (
        <div className={styles.shopPage}>
            <div className="container">
                <Link href="/shops" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to Shops
                </Link>

                {/* Shop Header */}
                <motion.div className={styles.shopHeader} {...fadeInUp}>
                    <div className={styles.shopLogo}>
                        <Package size={48} />
                    </div>
                    <div className={styles.shopInfo}>
                        <h1 className={styles.shopName}>{shop.name}</h1>
                        <div className={styles.shopMeta}>
                            <span className={styles.rating}>
                                <Star size={16} fill="currentColor" />
                                {shop.rating}
                            </span>
                            <span className={styles.location}>
                                <MapPin size={16} />
                                {shop.location}
                            </span>
                        </div>
                        <p className={styles.description}>{shop.description}</p>
                    </div>
                    <div className={styles.deliveryInfo}>
                        <div className={styles.deliveryItem}>
                            <Clock size={18} />
                            <span>{shop.estimatedDelivery}</span>
                        </div>
                        <div className={styles.deliveryItem}>
                            <Truck size={18} />
                            <span>₹{shop.deliveryFee} delivery</span>
                        </div>
                    </div>
                </motion.div>

                {/* Products Section */}
                <section className={styles.productsSection}>
                    <h2 className={styles.sectionTitle}>Products from {shop.name}</h2>

                    {shopProducts.length > 0 ? (
                        <motion.div
                            className={styles.productsGrid}
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {shopProducts.map((product) => {
                                const category = categories.find((c) => c.id === product.categoryId);
                                return (
                                    <motion.div key={product.id} variants={fadeInUp} className={styles.productCard}>
                                        <Link href={`/products/${product.slug}`} className={styles.productImage}>
                                            <Package size={40} />
                                            {product.discountPrice && (
                                                <span className={styles.discountBadge}>
                                                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                                                </span>
                                            )}
                                        </Link>
                                        <div className={styles.productInfo}>
                                            <span className={styles.productCategory}>{category?.name}</span>
                                            <Link href={`/products/${product.slug}`}>
                                                <h3 className={styles.productName}>{product.name}</h3>
                                            </Link>
                                            <div className={styles.productRating}>
                                                <Star size={14} fill="currentColor" />
                                                <span>{product.rating}</span>
                                            </div>
                                            <div className={styles.productPricing}>
                                                <span className={styles.price}>
                                                    ₹{product.discountPrice || product.price}
                                                </span>
                                                {product.discountPrice && (
                                                    <span className={styles.originalPrice}>₹{product.price}</span>
                                                )}
                                            </div>
                                            <button
                                                className={styles.addBtn}
                                                onClick={() => addItem(product)}
                                                disabled={!product.availability}
                                            >
                                                <Plus size={18} />
                                                Add
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <div className={styles.emptyState}>
                            <Package size={64} />
                            <h3>No products available</h3>
                            <p>This shop hasn&apos;t added any products yet.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
