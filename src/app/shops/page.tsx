'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Store, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import styles from './shops.module.css';
import { shops } from '@/data/mockData';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.08 },
    },
};

export default function ShopsPage() {
    return (
        <div className={styles.shopsPage}>
            <div className="container">
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className={styles.title}>Partner Shops</h1>
                    <p className={styles.subtitle}>
                        Discover local vendors and restaurants delivering to your doorstep
                    </p>
                </motion.div>

                {/* Shops Grid */}
                <motion.div
                    className={styles.shopsGrid}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {shops.map((shop) => (
                        <motion.div key={shop.id} variants={fadeInUp}>
                            <Link href={`/shops/${shop.slug}`} className={styles.shopCard}>
                                <div className={styles.shopLogo}>
                                    {shop.name.charAt(0)}
                                </div>
                                <div className={styles.shopContent}>
                                    <h2 className={styles.shopName}>{shop.name}</h2>
                                    <div className={styles.shopMeta}>
                                        <span className={styles.rating}>
                                            <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                                            {shop.rating}
                                        </span>
                                        <span className={styles.location}>
                                            <MapPin size={14} />
                                            {shop.locationTag}
                                        </span>
                                    </div>
                                    <div className={styles.shopInfo}>
                                        <span className={styles.deliveryFee}>₹{shop.deliveryFee} delivery</span>
                                        <span className={styles.time}>
                                            <Clock size={14} />
                                            {shop.estimatedTime}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight size={20} className={styles.arrow} />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
