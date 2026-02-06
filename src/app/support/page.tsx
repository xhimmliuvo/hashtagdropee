'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react';
import styles from './support.module.css';

const faqs = [
    {
        category: 'Orders',
        questions: [
            {
                q: 'How do I place an order?',
                a: 'Browse our products, add items to your cart, proceed to checkout, fill in your delivery details, and complete your order via WhatsApp. Our team will confirm your order and arrange delivery.',
            },
            {
                q: 'Can I modify my order after placing it?',
                a: 'Yes! Contact us via WhatsApp within 10 minutes of placing your order. We\'ll do our best to accommodate changes before the order is processed.',
            },
            {
                q: 'What payment methods are accepted?',
                a: 'We accept Cash on Delivery (COD) and various UPI payment methods. Payment is collected at the time of delivery.',
            },
        ],
    },
    {
        category: 'Delivery',
        questions: [
            {
                q: 'What areas do you deliver to?',
                a: 'We currently deliver to Imphal and surrounding areas including Thangmeiband, Keishampat, Singjamei, Paona Bazar, and more. Check with a specific shop for their delivery radius.',
            },
            {
                q: 'How long does delivery take?',
                a: 'Delivery times vary by shop and are typically 30-60 minutes. You\'ll see estimated delivery time on each shop\'s page.',
            },
            {
                q: 'Is there a delivery fee?',
                a: 'Yes, delivery fees vary by shop and distance. The fee is displayed on each shop\'s page and added to your order total at checkout.',
            },
        ],
    },
    {
        category: 'Services',
        questions: [
            {
                q: 'How do service requests work?',
                a: 'Browse our services, fill out the request form with your requirements, and submit via WhatsApp. Our team will review and provide a quote or confirmation.',
            },
            {
                q: 'What services do you offer?',
                a: 'We offer various errand and delivery services including document pickup, grocery shopping assistance, parcel delivery, and more.',
            },
        ],
    },
    {
        category: 'Account & Support',
        questions: [
            {
                q: 'Do I need to create an account?',
                a: 'No! We offer a zero-login experience. Just provide your name, phone number, and address at checkout.',
            },
            {
                q: 'How can I track my order?',
                a: 'After placing an order, you\'ll receive updates via WhatsApp. You can also message us anytime for order status.',
            },
        ],
    },
];

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className={styles.supportPage}>
            <div className="container">
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <HelpCircle size={48} className={styles.headerIcon} />
                    <h1 className={styles.title}>Help & Support</h1>
                    <p className={styles.subtitle}>
                        Find answers to common questions or reach out to us
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <motion.div
                    className={styles.contactGrid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <a href="https://wa.me/919876543210" target="_blank" className={styles.contactCard}>
                        <MessageCircle size={24} />
                        <div>
                            <h3>WhatsApp</h3>
                            <p>Chat with us anytime</p>
                        </div>
                    </a>
                    <a href="tel:+919876543210" className={styles.contactCard}>
                        <Phone size={24} />
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                        </div>
                    </a>
                    <a href="mailto:support@hashtagdropee.com" className={styles.contactCard}>
                        <Mail size={24} />
                        <div>
                            <h3>Email</h3>
                            <p>support@hashtagdropee.com</p>
                        </div>
                    </a>
                </motion.div>

                {/* FAQs */}
                <motion.section
                    className={styles.faqSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>

                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className={styles.faqCategory}>
                            <h3 className={styles.categoryTitle}>{category.category}</h3>
                            {category.questions.map((faq, qIndex) => {
                                const id = `${catIndex}-${qIndex}`;
                                const isOpen = openIndex === id;
                                return (
                                    <div key={id} className={styles.faqItem}>
                                        <button
                                            className={`${styles.faqQuestion} ${isOpen ? styles.open : ''}`}
                                            onClick={() => toggleFaq(id)}
                                        >
                                            <span>{faq.q}</span>
                                            <ChevronDown size={20} className={styles.chevron} />
                                        </button>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    className={styles.faqAnswer}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <p>{faq.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </motion.section>
            </div>
        </div>
    );
}
