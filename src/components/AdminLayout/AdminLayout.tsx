'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Package, Grid3X3, Store, Wrench,
    ClipboardList, Tag, Menu, X, ChevronRight, LogOut, Settings
} from 'lucide-react';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/admin/shops', label: 'Shops', icon: Store },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
    { href: '/admin/promotions', label: 'Promotions', icon: Tag },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className={styles.adminLayout}>
            {/* Mobile Menu Toggle */}
            <button
                className={styles.mobileMenuBtn}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || mobileMenuOpen) && (
                    <motion.aside
                        className={`${styles.sidebar} ${mobileMenuOpen ? styles.mobileOpen : ''}`}
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: 'spring', damping: 25 }}
                    >
                        <div className={styles.sidebarHeader}>
                            <Link href="/admin" className={styles.logo}>
                                <span className={styles.logoIcon}>#</span>
                                <span className={styles.logoText}>Admin</span>
                            </Link>
                            <button
                                className={styles.collapseBtn}
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <nav className={styles.nav}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`${styles.navItem} ${active ? styles.active : ''}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className={styles.navIcon}>
                                            <Icon size={20} />
                                        </span>
                                        <span className={styles.navLabel}>{item.label}</span>
                                        {active && (
                                            <motion.span
                                                className={styles.activeIndicator}
                                                layoutId="activeNav"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className={styles.sidebarFooter}>
                            <Link href="/admin/settings" className={styles.footerLink}>
                                <Settings size={18} />
                                <span>Settings</span>
                            </Link>
                            <Link href="/" className={styles.footerLink}>
                                <LogOut size={18} />
                                <span>Exit Admin</span>
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className={`${styles.mainContent} ${!sidebarOpen ? styles.expanded : ''}`}>
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </main>
        </div>
    );
}
