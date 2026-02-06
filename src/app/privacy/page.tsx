import { Metadata } from 'next';
import styles from '../terms/legal.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy | HASHTAGDROPEE',
    description: 'How HASHTAGDROPEE collects, uses, and protects your information',
};

export default function PrivacyPage() {
    return (
        <div className={styles.legalPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last updated: February 2026</p>

                    <section className={styles.section}>
                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us:</p>
                        <ul>
                            <li><strong>Contact Information:</strong> Name, phone number, delivery address</li>
                            <li><strong>Order Information:</strong> Products ordered, order history, delivery preferences</li>
                            <li><strong>Communication Data:</strong> WhatsApp messages related to orders and support</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Process and deliver your orders</li>
                            <li>Communicate with you about orders and services</li>
                            <li>Send promotional offers (with your consent)</li>
                            <li>Improve our services and user experience</li>
                            <li>Prevent fraud and maintain security</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>3. Information Sharing</h2>
                        <p>
                            We share your information only as necessary to provide our services:
                        </p>
                        <ul>
                            <li><strong>Partner Shops:</strong> Order details for fulfillment</li>
                            <li><strong>Delivery Partners:</strong> Delivery address and contact for delivery</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                        </ul>
                        <p>We do not sell your personal information to third parties.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information
                            against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Data Retention</h2>
                        <p>
                            We retain your information for as long as necessary to provide services and fulfill legal obligations.
                            Order history is retained for 2 years for customer support purposes.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal information</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data (subject to legal requirements)</li>
                            <li>Opt out of promotional communications</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>7. Cookies and Tracking</h2>
                        <p>
                            We use essential cookies to enable core functionality. We may use analytics to understand
                            how our service is used. You can control cookie settings through your browser.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>8. Contact Us</h2>
                        <p>
                            For privacy-related inquiries, contact us at:{' '}
                            <a href="mailto:privacy@hashtagdropee.com">privacy@hashtagdropee.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
