'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Carrot, Gift, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import styles from './categories.module.css';
import { categories } from '@/data/mockData';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const categoryIcons: Record<string, React.ReactNode> = {
    food: <UtensilsCrossed size={48} />,
    grocery: <Carrot size={48} />,
    gifts: <Gift size={48} />,
    'custom-delivery': <Truck size={48} />,
};

export default function CategoriesPage() {
    return (
        <div className={styles.categoriesPage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className={styles.title}>Categories</h1>
                        <p className={styles.subtitle}>Browse our selection and find what you need</p>
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className={styles.categoriesSection}>
                <div className="container">
                    <motion.div
                        className={styles.grid}
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {categories.map((category) => (
                            <motion.div key={category.id} variants={fadeInUp}>
                                <Link href={`/categories/${category.slug}`} className={styles.card}>
                                    <div className={styles.cardIcon}>
                                        {categoryIcons[category.slug] || <ShoppingBag size={48} />}
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h2 className={styles.cardTitle}>{category.name}</h2>
                                        <p className={styles.cardDescription}>{category.description}</p>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.productCount}>{category.productCount} items</span>
                                            <span className={styles.cardLink}>
                                                Browse <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
