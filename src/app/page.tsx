'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap, ShoppingBag, Gift, Truck, Package, FileText, Clipboard,
  ArrowRight, Star, MapPin, Clock, Users, ThumbsUp, ShieldCheck,
  UtensilsCrossed, Carrot
} from 'lucide-react';
import styles from './page.module.css';
import { categories, services, shops, products } from '@/data/mockData';

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
  food: <UtensilsCrossed size={32} />,
  grocery: <Carrot size={32} />,
  gifts: <Gift size={32} />,
  'custom-delivery': <Truck size={32} />,
};

const serviceIcons: Record<string, React.ReactNode> = {
  'pick-drop': <Package size={24} />,
  'document-delivery': <FileText size={24} />,
  'custom-errands': <Clipboard size={24} />,
  'bulk-delivery': <Truck size={24} />,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
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
              Fast & Reliable Delivery
            </motion.span>

            <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
              Get Everything <br />
              <span className={styles.heroHighlight}>Delivered Fast</span>
            </motion.h1>

            <motion.p className={styles.heroDescription} variants={fadeInUp}>
              Food, groceries, gifts, and more — delivered to your doorstep in Imphal.
              No login required. Just order and go.
            </motion.p>

            <motion.div className={styles.heroActions} variants={fadeInUp}>
              <Link href="/categories" className="btn btn-primary">
                Order Now
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn btn-secondary">
                Explore Services
              </Link>
            </motion.div>

            <motion.div className={styles.heroStats} variants={fadeInUp}>
              <div className={styles.stat}>
                <span className={styles.statValue}>500+</span>
                <span className={styles.statLabel}>Orders Delivered</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>50+</span>
                <span className={styles.statLabel}>Partner Shops</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>4.8</span>
                <span className={styles.statLabel}>Avg Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className={styles.sectionTitle}>Shop by Category</h2>
              <p className={styles.sectionSubtitle}>Find exactly what you need</p>
            </div>
            <Link href="/categories" className={styles.serviceLink}>
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className={styles.categoriesGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link href={`/categories/${category.slug}`} className={styles.categoryCard}>
                  <div className={styles.categoryIcon}>
                    {categoryIcons[category.slug] || <ShoppingBag size={32} />}
                  </div>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <span className={styles.categoryCount}>{category.productCount} items</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.section} style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className={styles.sectionTitle}>Our Services</h2>
              <p className={styles.sectionSubtitle}>Beyond just delivery</p>
            </div>
            <Link href="/services" className={styles.serviceLink}>
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

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
                    {serviceIcons[service.slug] || <Package size={24} />}
                  </div>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.serviceDescription}>
                    {service.description.slice(0, 80)}...
                  </p>
                  <span className={styles.serviceLink}>
                    Try Service <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Shops Section */}
      <section className={styles.section}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className={styles.sectionTitle}>Featured Shops</h2>
              <p className={styles.sectionSubtitle}>Top-rated partners near you</p>
            </div>
            <Link href="/shops" className={styles.serviceLink}>
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className={styles.shopsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {shops.map((shop) => (
              <motion.div key={shop.id} variants={fadeInUp}>
                <Link href={`/shops/${shop.slug}`} className={styles.shopCard}>
                  <div className={styles.shopLogo}>
                    {shop.name.charAt(0)}
                  </div>
                  <div className={styles.shopInfo}>
                    <h3 className={styles.shopName}>{shop.name}</h3>
                    <div className={styles.shopMeta}>
                      <span className={styles.shopRating}>
                        <Star size={14} fill="currentColor" />
                        {shop.rating}
                      </span>
                      <span>
                        <MapPin size={12} /> {shop.locationTag}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.section} style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className={styles.sectionTitle}>Trending Now</h2>
              <p className={styles.sectionSubtitle}>Most ordered this week</p>
            </div>
            <Link href="/categories" className={styles.serviceLink}>
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            className={styles.productsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <div className={styles.productCard}>
                  <Link href={`/products/${product.slug}`}>
                    <div className={styles.productImage}>
                      {product.discountPrice && (
                        <span className={styles.discountBadge}>
                          {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                        </span>
                      )}
                      <ShoppingBag size={40} />
                    </div>
                  </Link>
                  <div className={styles.productInfo}>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className={styles.productName}>{product.name}</h3>
                    </Link>
                    <div className={styles.productPricing}>
                      <span className={styles.productPrice}>
                        ₹{product.discountPrice || product.price}
                      </span>
                      {product.discountPrice && (
                        <span className={styles.originalPrice}>₹{product.price}</span>
                      )}
                    </div>
                    <div className={styles.productRating}>
                      <Star size={14} fill="currentColor" />
                      <span>{product.rating}</span>
                    </div>
                    <button className={styles.addToCartBtn}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.trustSection}>
            <motion.div
              className={styles.trustGrid}
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div className={styles.trustItem} variants={fadeInUp}>
                <div className={styles.trustIcon}>
                  <Users size={28} />
                </div>
                <span className={styles.trustValue}>1000+</span>
                <span className={styles.trustLabel}>Happy Customers</span>
              </motion.div>

              <motion.div className={styles.trustItem} variants={fadeInUp}>
                <div className={styles.trustIcon}>
                  <ThumbsUp size={28} />
                </div>
                <span className={styles.trustValue}>98%</span>
                <span className={styles.trustLabel}>Satisfaction Rate</span>
              </motion.div>

              <motion.div className={styles.trustItem} variants={fadeInUp}>
                <div className={styles.trustIcon}>
                  <ShieldCheck size={28} />
                </div>
                <span className={styles.trustValue}>100%</span>
                <span className={styles.trustLabel}>Secure Ordering</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
