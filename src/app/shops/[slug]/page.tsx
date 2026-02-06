'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Star, MapPin, Clock, Truck, Package, Plus
} from 'lucide-react';
import styles from './shopDetail.module.css';
import { shops, products, categories } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

// Generate static params for all shops
export function generateStaticParams() {
    return shops.map((shop) => ({
        slug: shop.slug,
    }));
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.05 },
    },
};

export default function ShopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const shop = shops.find((s) => s.slug === slug);
    const { addItem } = useCart();

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
    const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name || '';

    return (
        <div className={styles.shopPage}>
            <div className="container">
                <Link href="/shops" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to Shops
                </Link>

                {/* Shop Header */}
                <motion.div
                    className={styles.shopHeader}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.shopLogo}>
                        {shop.name.charAt(0)}
                    </div>
                    <div className={styles.shopInfo}>
                        <h1 className={styles.shopName}>{shop.name}</h1>
                        <div className={styles.shopMeta}>
                            <span className={styles.rating}>
                                <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />
                                {shop.rating} rating
                            </span>
                            <span className={styles.location}>
                                <MapPin size={16} />
                                {shop.locationTag}
                            </span>
                        </div>
                        <div className={styles.deliveryInfo}>
                            <span className={styles.deliveryBadge}>
                                <Truck size={14} />
                                ₹{shop.deliveryFee} delivery
                            </span>
                            <span className={styles.timeBadge}>
                                <Clock size={14} />
                                {shop.estimatedTime}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Products */}
                <section className={styles.productsSection}>
                    <h2 className={styles.sectionTitle}>
                        <Package size={20} />
                        Products from {shop.name}
                    </h2>

                    {shopProducts.length > 0 ? (
                        <motion.div
                            className={styles.productsGrid}
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {shopProducts.map((product) => (
                                <motion.div key={product.id} variants={fadeInUp}>
                                    <div className={styles.productCard}>
                                        <Link href={`/products/${product.slug}`} className={styles.productLink}>
                                            <div className={styles.productImage}>
                                                <Package size={32} />
                                                {product.discountPrice && (
                                                    <span className={styles.discountBadge}>
                                                        {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                                                    </span>
                                                )}
                                            </div>
                                            <div className={styles.productInfo}>
                                                <span className={styles.categoryTag}>{getCategoryName(product.categoryId)}</span>
                                                <h3 className={styles.productName}>{product.name}</h3>
                                                <div className={styles.productPrice}>
                                                    {product.discountPrice ? (
                                                        <>
                                                            <span className={styles.discountPrice}>₹{product.discountPrice}</span>
                                                            <span className={styles.originalPrice}>₹{product.price}</span>
                                                        </>
                                                    ) : (
                                                        <span className={styles.price}>₹{product.price}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
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
                            ))}
                        </motion.div>
                    ) : (
                        <div className={styles.emptyState}>
                            <Package size={48} />
                            <h3>No products yet</h3>
                            <p>This shop hasn&apos;t added any products yet.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
