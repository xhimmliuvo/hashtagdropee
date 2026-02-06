'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Clock, DollarSign, Send, Package, FileText, Clipboard, Truck, Info } from 'lucide-react';
import styles from './serviceDetail.module.css';
import { services, Service, ServiceField } from '@/data/mockData';

const serviceIcons: Record<string, React.ReactNode> = {
    'pick-drop': <Package size={40} />,
    'document-delivery': <FileText size={40} />,
    'custom-errands': <Clipboard size={40} />,
    'bulk-delivery': <Truck size={40} />,
};

interface FormData {
    name: string;
    phone: string;
    [key: string]: string;
}

interface ServiceDetailClientProps {
    slug: string;
}

export default function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
    const service = services.find((s) => s.slug === slug);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!service) {
        return (
            <div className={styles.notFound}>
                <h1>Service not found</h1>
                <Link href="/services" className="btn btn-primary">
                    Back to Services
                </Link>
            </div>
        );
    }

    const handleInputChange = (fieldId: string, value: string) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Build WhatsApp message
        const fieldDetails = service.fields
            .map((field) => `${field.label}: ${formData[field.id] || 'Not provided'}`)
            .join('\n');

        const message = `
*New Service Request - HASHTAGDROPEE*

*Service:* ${service.name}

*Customer:*
Name: ${formData.name}
Phone: ${formData.phone}

*Details:*
${fieldDetails}

*Preferred Time:* ${formData.preferredTime || 'Not specified'}
    `.trim();

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919000000000?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        setIsSubmitting(false);
    };

    return (
        <div className={styles.serviceDetailPage}>
            {/* Back Navigation */}
            <div className="container">
                <Link href="/services" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to Services
                </Link>
            </div>

            {/* Service Header */}
            <section className={styles.header}>
                <div className="container">
                    <motion.div
                        className={styles.headerContent}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.serviceIcon}>
                            {serviceIcons[service.slug] || <Package size={40} />}
                        </div>
                        <h1 className={styles.serviceTitle}>{service.name}</h1>
                        <p className={styles.serviceDescription}>{service.description}</p>

                        <div className={styles.pricingInfo}>
                            {service.pricingType === 'fixed' && service.basePrice && (
                                <span className={styles.priceBadge}>Starting from ₹{service.basePrice}</span>
                            )}
                            {service.pricingType === 'distance' && (
                                <span className={styles.priceBadge}>Distance-based pricing</span>
                            )}
                            {service.pricingType === 'custom' && (
                                <span className={styles.priceBadge}>Custom quote after request</span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Request Form */}
            <section className={styles.formSection}>
                <div className="container">
                    <motion.div
                        className={styles.formCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className={styles.formTitle}>Request This Service</h2>
                        <p className={styles.formSubtitle}>
                            Fill in the details and we'll connect via WhatsApp
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Customer Info */}
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

                            {/* Dynamic Fields */}
                            {service.fields.map((field) => (
                                <div key={field.id} className={styles.formGroup}>
                                    <label className={styles.label}>
                                        {field.label} {field.required && '*'}
                                    </label>

                                    {field.type === 'text' && (
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            value={formData[field.id] || ''}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            required={field.required}
                                        />
                                    )}

                                    {field.type === 'textarea' && (
                                        <textarea
                                            className={`input ${styles.textarea}`}
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            rows={3}
                                            value={formData[field.id] || ''}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            required={field.required}
                                        />
                                    )}

                                    {field.type === 'dropdown' && field.options && (
                                        <select
                                            className={`input ${styles.select}`}
                                            value={formData[field.id] || ''}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            required={field.required}
                                        >
                                            <option value="">Select {field.label.toLowerCase()}</option>
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}

                            <div className={styles.infoBox}>
                                <Info size={18} />
                                <span>
                                    Your request will be sent via WhatsApp. Our team will respond within minutes.
                                </span>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary ${styles.submitBtn}`}
                                disabled={isSubmitting}
                            >
                                <MessageCircle size={20} />
                                Request via WhatsApp
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
