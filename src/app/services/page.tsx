'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, FileText, Clipboard, Truck, ArrowRight, Zap } from 'lucide-react';
import styles from './services.module.css';
import { services } from '@/data/mockData';

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

const serviceIcons: Record<string, React.ReactNode> = {
    'pick-drop': <Package size={32} />,
    'document-delivery': <FileText size={32} />,
    'custom-errands': <Clipboard size={32} />,
    'bulk-delivery': <Truck size={32} />,
};

export default function ServicesPage() {
    return (
        <div className={styles.servicesPage}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroContent}
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.span className={styles.heroTagline} variants={fadeInUp}>
                            <Zap size={16} />
                            Capability-Led Solutions
                        </motion.span>

                        <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
                            Our <span className={styles.heroHighlight}>Services</span>
                        </motion.h1>

                        <motion.p className={styles.heroDescription} variants={fadeInUp}>
                            More than just delivery. We handle your errands, documents,
                            and custom requests with care and speed.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.servicesSection}>
                <div className="container">
                    <motion.div
                        className={styles.servicesGrid}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {services.map((service) => (
                            <motion.div key={service.id} variants={fadeInUp}>
                                <Link href={`/services/${service.slug}`} className={styles.serviceCard}>
                                    <div className={styles.serviceIcon}>
                                        {serviceIcons[service.slug] || <Package size={32} />}
                                    </div>

                                    <div className={styles.serviceContent}>
                                        <h2 className={styles.serviceName}>{service.name}</h2>
                                        <p className={styles.serviceDescription}>{service.description}</p>

                                        <div className={styles.serviceMeta}>
                                            {service.pricingType === 'fixed' && service.basePrice && (
                                                <span className={styles.priceBadge}>From ₹{service.basePrice}</span>
                                            )}
                                            {service.pricingType === 'distance' && (
                                                <span className={styles.priceBadge}>Distance-based</span>
                                            )}
                                            {service.pricingType === 'custom' && (
                                                <span className={styles.priceBadge}>Custom Quote</span>
                                            )}
                                        </div>

                                        <span className={styles.serviceLink}>
                                            Try Service <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <motion.div
                        className={styles.ctaCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.ctaTitle}>Need something custom?</h2>
                        <p className={styles.ctaDescription}>
                            Can't find what you're looking for? Reach out and we'll figure it out together.
                        </p>
                        <a
                            href="https://wa.me/919000000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Chat on WhatsApp
                            <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
