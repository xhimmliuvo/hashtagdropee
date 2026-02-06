'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, MessageCircle, Tag, CheckCircle } from 'lucide-react';
import styles from './checkout.module.css';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const { items, subtotal, deliveryFee, total, promoCode, setPromoCode, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        instructions: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [promoInput, setPromoInput] = useState('');

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
                    <p>Add some items before checking out!</p>
                    <Link href="/categories" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleApplyPromo = () => {
        // For now, just set the promo code
        // In production, this would validate against the database
        setPromoCode(promoInput);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Build product list for WhatsApp message
        const productList = items
            .map((item) => `- ${item.product.name} (Qty: ${item.quantity}, ₹${(item.product.discountPrice || item.product.price) * item.quantity})`)
            .join('\n');

        // Build WhatsApp message
        const message = `
*New Order - HashtagDropee*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

*Products:*
${productList}

*Order Summary:*
Subtotal: ₹${subtotal}
Delivery Fee: ₹${deliveryFee}
${promoCode ? `Promo Applied: ${promoCode}` : ''}
*Total Amount: ₹${total}*

*Notes:*
${formData.instructions || 'None'}
    `.trim();

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919000000000?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Clear cart after order
        clearCart();

        setIsSubmitting(false);
    };

    return (
        <div className={styles.checkoutPage}>
            <div className="container">
                <Link href="/cart" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to Cart
                </Link>

                <div className={styles.checkoutLayout}>
                    {/* Checkout Form */}
                    <motion.div
                        className={styles.formSection}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h1 className={styles.title}>Checkout</h1>
                        <p className={styles.subtitle}>No login required. Just tell us where to deliver!</p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Your Name *</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Phone Number *</label>
                                <input
                                    type="tel"
                                    className="input"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Delivery Address *</label>
                                <textarea
                                    className={`input ${styles.textarea}`}
                                    placeholder="Enter your complete delivery address"
                                    rows={3}
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Special Instructions (Optional)</label>
                                <textarea
                                    className={`input ${styles.textarea}`}
                                    placeholder="Any special requests or delivery instructions?"
                                    rows={2}
                                    value={formData.instructions}
                                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                                />
                            </div>

                            {/* Promo Code */}
                            <div className={styles.promoSection}>
                                <label className={styles.label}>
                                    <Tag size={16} />
                                    Promo Code
                                </label>
                                <div className={styles.promoInput}>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Enter promo code"
                                        value={promoInput}
                                        onChange={(e) => setPromoInput(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={styles.promoBtn}
                                        onClick={handleApplyPromo}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {promoCode && (
                                    <span className={styles.promoApplied}>
                                        <CheckCircle size={14} />
                                        Promo code applied!
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary ${styles.submitBtn}`}
                                disabled={isSubmitting}
                            >
                                <MessageCircle size={20} />
                                Place Order via WhatsApp
                            </button>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        className={styles.summarySection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.itemsList}>
                            {items.map((item) => (
                                <div key={item.product.id} className={styles.summaryItem}>
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemName}>{item.product.name}</span>
                                        <span className={styles.itemQty}>x{item.quantity}</span>
                                    </div>
                                    <span className={styles.itemPrice}>
                                        ₹{(item.product.discountPrice || item.product.price) * item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summaryRows}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Delivery Fee</span>
                                <span>₹{deliveryFee}</span>
                            </div>
                            {promoCode && (
                                <div className={`${styles.summaryRow} ${styles.promoRow}`}>
                                    <span>Promo Discount</span>
                                    <span>-₹0</span>
                                </div>
                            )}
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
