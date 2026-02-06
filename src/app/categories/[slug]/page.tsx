'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Plus } from 'lucide-react';
import styles from './categoryProducts.module.css';
import { categories, products } from '@/data/mockData';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export default function CategoryProductsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const category = categories.find((c) => c.slug === slug);
    const categoryProducts = products.filter((p) => {
        const productCategory = categories.find((c) => c.id === p.categoryId);
        return productCategory?.slug === slug;
    });

    if (!category) {
        return (
            <div className={styles.notFound}>
                <h1>Category not found</h1>
                <Link href="/categories" className="btn btn-primary">
                    Back to Categories
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.categoryPage}>
            {/* Back Navigation */}
            <div className="container">
                <Link href="/categories" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to Categories
                </Link>
            </div>

            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className={styles.title}>{category.name}</h1>
                        <p className={styles.subtitle}>{category.description}</p>
                        <span className={styles.count}>{categoryProducts.length} items available</span>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className={styles.productsSection}>
                <div className="container">
                    {categoryProducts.length > 0 ? (
                        <motion.div
                            className={styles.grid}
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {categoryProducts.map((product) => (
                                <motion.div key={product.id} variants={fadeInUp}>
                                    <div className={styles.productCard}>
                                        <Link href={`/products/${product.slug}`}>
                                            <div className={styles.productImage}>
                                                {product.discountPrice && (
                                                    <span className={styles.discountBadge}>
                                                        {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                                                    </span>
                                                )}
                                                <ShoppingBag size={48} />
                                            </div>
                                        </Link>
                                        <div className={styles.productInfo}>
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
                                            <button className={styles.addBtn}>
                                                <Plus size={18} />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className={styles.emptyState}>
                            <ShoppingBag size={64} />
                            <h2>No products yet</h2>
                            <p>Check back soon for new items in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
