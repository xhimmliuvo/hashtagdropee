'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Star, ShoppingCart, Minus, Plus, Clock, MapPin, Check, ChevronLeft, ChevronRight
} from 'lucide-react';
import styles from './productDetail.module.css';
import { products, shops, categories } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

// Generate static params for all products
export function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = products.find((p) => p.slug === slug);
    const { addItem, items } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h1>Product not found</h1>
                <Link href="/categories" className="btn btn-primary">
                    Browse Products
                </Link>
            </div>
        );
    }

    const shop = shops.find((s) => s.id === product.shopId);
    const category = categories.find((c) => c.id === product.categoryId);
    const cartItem = items.find((item) => item.product.id === product.id);
    const images = product.images.length > 0 ? product.images : ['/images/products/default.jpg'];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.productPage}>
            <div className="container">
                <Link href={category ? `/categories/${category.slug}` : '/categories'} className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to {category?.name || 'Products'}
                </Link>

                <div className={styles.productLayout}>
                    {/* Image Gallery */}
                    <motion.div
                        className={styles.gallery}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className={styles.mainImage}>
                            <div className={styles.imagePlaceholder}>
                                <ShoppingCart size={80} />
                            </div>
                            {images.length > 1 && (
                                <>
                                    <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImage}>
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImage}>
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                            {product.discountPrice && (
                                <span className={styles.discountBadge}>
                                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                                </span>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className={styles.thumbnails}>
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`${styles.thumbnail} ${currentImage === idx ? styles.active : ''}`}
                                        onClick={() => setCurrentImage(idx)}
                                    >
                                        <div className={styles.thumbPlaceholder} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        className={styles.productInfo}
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                    >
                        <span className={styles.categoryTag}>{category?.name}</span>
                        <h1 className={styles.productName}>{product.name}</h1>

                        <div className={styles.meta}>
                            <span className={styles.rating}>
                                <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />
                                {product.rating}
                            </span>
                            {product.availability ? (
                                <span className={styles.available}>
                                    <Check size={14} /> In Stock
                                </span>
                            ) : (
                                <span className={styles.unavailable}>Out of Stock</span>
                            )}
                        </div>

                        <div className={styles.priceBlock}>
                            {product.discountPrice ? (
                                <>
                                    <span className={styles.price}>₹{product.discountPrice}</span>
                                    <span className={styles.originalPrice}>₹{product.price}</span>
                                </>
                            ) : (
                                <span className={styles.price}>₹{product.price}</span>
                            )}
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        {/* Shop Info */}
                        {shop && (
                            <Link href={`/shops/${shop.slug}`} className={styles.shopCard}>
                                <div className={styles.shopLogo}>
                                    {shop.name.charAt(0)}
                                </div>
                                <div className={styles.shopInfo}>
                                    <span className={styles.shopName}>{shop.name}</span>
                                    <span className={styles.shopMeta}>
                                        <MapPin size={12} /> {shop.locationTag}
                                        <Clock size={12} /> {shop.estimatedTime}
                                    </span>
                                </div>
                            </Link>
                        )}

                        {/* Add to Cart */}
                        <div className={styles.addToCart}>
                            <div className={styles.quantityControl}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className={styles.qtyBtn}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className={styles.qtyBtn}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button
                                className={`btn btn-primary ${styles.addBtn} ${added ? styles.added : ''}`}
                                onClick={handleAddToCart}
                                disabled={!product.availability}
                            >
                                {added ? (
                                    <>
                                        <Check size={20} />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        Add to Cart - ₹{(product.discountPrice || product.price) * quantity}
                                    </>
                                )}
                            </button>
                        </div>

                        {cartItem && (
                            <p className={styles.cartNote}>
                                You have {cartItem.quantity} in your cart
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
