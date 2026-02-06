import Link from 'next/link';
import { MessageCircle, MapPin, Clock, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = {
    shop: [
        { href: '/categories', label: 'Categories' },
        { href: '/shops', label: 'Shops' },
        { href: '/services', label: 'Services' },
    ],
    support: [
        { href: '/support', label: 'Help Center' },
        { href: '/support#faqs', label: 'FAQs' },
        { href: '/blog', label: 'Blog' },
    ],
    legal: [
        { href: '/terms', label: 'Terms & Conditions' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/refund', label: 'Refund Policy' },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.footerMain}>
                    <div className={styles.footerBrand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoText}>Hashtag</span>
                            <span className={styles.logoAccent}>Dropee</span>
                        </Link>
                        <p className={styles.tagline}>
                            Fast, reliable delivery for everything you need.
                        </p>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <MapPin size={16} />
                                <span>Imphal, Manipur</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Clock size={16} />
                                <span>9 AM - 9 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerLinks}>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkGroupTitle}>Shop</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.shop.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkGroupTitle}>Support</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.support.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkGroupTitle}>Legal</h4>
                            <ul className={styles.linkList}>
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} HashtagDropee. All rights reserved.
                    </p>
                    <a
                        href="https://wa.me/919000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappBtn}
                    >
                        <MessageCircle size={18} />
                        <span>Chat with us</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
