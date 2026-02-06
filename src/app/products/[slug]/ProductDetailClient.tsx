'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Star, ShoppingCart, Minus, Plus, Clock, MapPin, Check, ChevronLeft, ChevronRight
} from 'lucide-react';
import styles from './productDetail.module.css';
import { products, shops, categories, Product } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

interface ProductDetailClientProps {
    slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addItem } = useCart();

    const product = products.find((p) => p.slug === slug);

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

    // Mock images for carousel
    const productImages = product.images && product.images.length > 0
        ? product.images
        : ['/placeholder1.jpg', '/placeholder2.jpg', '/placeholder3.jpg'];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    };

    const discountPercentage = product.discountPrice
        ? Math.round((1 - product.discountPrice / product.price) * 100)
        : 0;

    return (
        <div className={styles.productPage}>
            <div className="container">
                <Link href={category ? `/categories/${category.slug}` : '/categories'} className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to {category?.name || 'Categories'}
                </Link>

                <div className={styles.productLayout}>
                    {/* Image Gallery */}
                    <motion.div className={styles.gallery} {...fadeIn}>
                        <div className={styles.mainImage}>
                            {discountPercentage > 0 && (
                                <span className={styles.discountBadge}>{discountPercentage}% OFF</span>
                            )}
                            <div className={styles.imagePlaceholder}>
                                <ShoppingCart size={80} />
                            </div>
                            {productImages.length > 1 && (
                                <>
                                    <button className={styles.navPrev} onClick={prevImage}>
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button className={styles.navNext} onClick={nextImage}>
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className={styles.thumbnails}>
                            {productImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                >
                                    <ShoppingCart size={24} />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div className={styles.info} {...fadeIn} transition={{ delay: 0.1 }}>
                        <span className={styles.category}>{category?.name}</span>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.rating}>
                            <Star size={18} fill="currentColor" />
                            <span>{product.rating}</span>
                            <span className={styles.reviews}>({product.reviewCount} reviews)</span>
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.pricing}>
                            <span className={styles.price}>₹{product.discountPrice || product.price}</span>
                            {product.discountPrice && (
                                <span className={styles.originalPrice}>₹{product.price}</span>
                            )}
                        </div>

                        {/* Shop Info */}
                        {shop && (
                            <Link href={`/shops/${shop.slug}`} className={styles.shopCard}>
                                <div className={styles.shopInfo}>
                                    <span className={styles.shopName}>{shop.name}</span>
                                    <div className={styles.shopMeta}>
                                        <MapPin size={14} />
                                        <span>{shop.location}</span>
                                    </div>
                                </div>
                                <div className={styles.deliveryInfo}>
                                    <Clock size={14} />
                                    <span>{shop.estimatedDelivery}</span>
                                </div>
                            </Link>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className={styles.actions}>
                            <div className={styles.quantitySelector}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={18} />
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button
                                className={`${styles.addToCart} ${addedToCart ? styles.added : ''}`}
                                onClick={handleAddToCart}
                                disabled={!product.availability}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={20} />
                                        Added!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>

                        {!product.availability && (
                            <p className={styles.outOfStock}>Currently out of stock</p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
