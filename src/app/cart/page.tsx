'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './cart.module.css';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items, updateQuantity, removeItem, subtotal, deliveryFee, total, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.emptyContent}
                >
                    <ShoppingBag size={80} />
                    <h1>Your cart is empty</h1>
                    <p>Add some items to get started!</p>
                    <Link href="/categories" className="btn btn-primary">
                        Start Shopping
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <Link href="/categories" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Continue Shopping
                </Link>

                <div className={styles.cartLayout}>
                    {/* Cart Items */}
                    <motion.div
                        className={styles.cartItems}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h1 className={styles.title}>Your Cart ({totalItems} items)</h1>

                        <div className={styles.itemsList}>
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.product.id}
                                    className={styles.cartItem}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className={styles.itemImage}>
                                        <ShoppingBag size={32} />
                                    </div>

                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>{item.product.name}</h3>
                                        <span className={styles.itemPrice}>
                                            ₹{item.product.discountPrice || item.product.price}
                                        </span>
                                    </div>

                                    <div className={styles.itemActions}>
                                        <div className={styles.quantityControl}>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className={styles.qtyBtn}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className={styles.qtyBtn}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className={styles.removeBtn}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className={styles.itemTotal}>
                                        ₹{(item.product.discountPrice || item.product.price) * item.quantity}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        className={styles.orderSummary}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.summaryRows}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Delivery Fee</span>
                                <span>₹{deliveryFee}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                            Proceed to Checkout
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
