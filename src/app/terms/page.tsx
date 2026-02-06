import { Metadata } from 'next';
import styles from './legal.module.css';

export const metadata: Metadata = {
    title: 'Terms of Service | HASHTAGDROPEE',
    description: 'Terms and conditions for using HASHTAGDROPEE services',
};

export default function TermsPage() {
    return (
        <div className={styles.legalPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.lastUpdated}>Last updated: February 2026</p>

                    <section className={styles.section}>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using HASHTAGDROPEE (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>2. Description of Service</h2>
                        <p>
                            HASHTAGDROPEE is an e-commerce platform that connects customers with local shops and service providers
                            in Imphal, Manipur. We facilitate the ordering and delivery of products and services.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>3. User Responsibilities</h2>
                        <ul>
                            <li>Provide accurate contact and delivery information</li>
                            <li>Be available to receive orders at the specified delivery address</li>
                            <li>Make timely payment for orders received</li>
                            <li>Treat delivery personnel with respect</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>4. Orders and Payments</h2>
                        <p>
                            Orders are placed via WhatsApp and confirmed by our team. Payment is collected at the time of delivery
                            (Cash on Delivery) or through approved UPI methods. Prices include applicable taxes unless otherwise stated.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Delivery</h2>
                        <p>
                            Delivery times are estimates and may vary based on factors including traffic, weather, and order volume.
                            We are not liable for delays beyond our reasonable control.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>6. Cancellation</h2>
                        <p>
                            Orders may be cancelled within 10 minutes of placement by contacting us via WhatsApp.
                            After this window, cancellation may not be possible if preparation has begun.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>7. Limitation of Liability</h2>
                        <p>
                            HASHTAGDROPEE acts as an intermediary between customers and vendors. We are not responsible for the
                            quality, safety, or legality of products sold by partner shops. Disputes regarding product quality
                            should be raised via our support channels.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>8. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Continued use of the service after changes
                            constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>9. Contact</h2>
                        <p>
                            For questions about these terms, contact us at:{' '}
                            <a href="mailto:legal@hashtagdropee.com">legal@hashtagdropee.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
