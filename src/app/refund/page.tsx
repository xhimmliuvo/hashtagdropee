import { Metadata } from 'next';
import styles from '../terms/legal.module.css';

export const metadata: Metadata = {
    title: 'Refund Policy | HASHTAGDROPEE',
    description: 'Refund and cancellation policy for HASHTAGDROPEE orders',
};

export default function RefundPage() {
    return (
        <div className={styles.legalPage}>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={styles.title}>Refund Policy</h1>
                    <p className={styles.lastUpdated}>Last updated: February 2026</p>

                    <section className={styles.section}>
                        <h2>1. Order Cancellation</h2>
                        <p>
                            You may cancel your order within 10 minutes of placement by contacting us via WhatsApp.
                            After this window, cancellation may not be possible if the order is already being prepared.
                        </p>
                        <ul>
                            <li><strong>Within 10 minutes:</strong> Full refund/no charge</li>
                            <li><strong>After preparation started:</strong> Partial refund based on preparation stage</li>
                            <li><strong>After dispatch:</strong> No cancellation possible</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>2. Refund Eligibility</h2>
                        <p>Refunds are provided in the following situations:</p>
                        <ul>
                            <li>Wrong items delivered</li>
                            <li>Missing items from your order</li>
                            <li>Damaged or spoiled products</li>
                            <li>Quality issues reported within 2 hours of delivery</li>
                            <li>Order not delivered within reasonable time without communication</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>3. Refund Process</h2>
                        <p>
                            To request a refund:
                        </p>
                        <ul>
                            <li>Contact us via WhatsApp within 2 hours of delivery</li>
                            <li>Provide your order number and describe the issue</li>
                            <li>Include photos if reporting damage or quality issues</li>
                        </ul>
                        <p>
                            Our team will review your request and respond within 24 hours.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>4. Refund Methods</h2>
                        <p>Refunds are processed through:</p>
                        <ul>
                            <li><strong>COD Orders:</strong> Credit applied to your next order or UPI transfer</li>
                            <li><strong>UPI Payments:</strong> Refund to the same UPI ID used for payment</li>
                        </ul>
                        <p>Refunds are typically processed within 3-5 business days.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Non-Refundable Items</h2>
                        <ul>
                            <li>Items consumed or used before reporting issues</li>
                            <li>Issues reported after 2 hours of delivery</li>
                            <li>Customer-caused damage</li>
                            <li>Incorrect address provided by customer</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>6. Service Request Refunds</h2>
                        <p>
                            For service requests (errands, deliveries):
                        </p>
                        <ul>
                            <li>Cancellation before service begins: Full refund</li>
                            <li>Partial completion: Pro-rated refund</li>
                            <li>Service not satisfactorily completed: Review on case-by-case basis</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>7. Contact</h2>
                        <p>
                            For refund requests or questions:{' '}
                            <a href="https://wa.me/919876543210" target="_blank">
                                Contact us on WhatsApp
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
