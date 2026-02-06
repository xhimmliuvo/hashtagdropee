// Admin-specific data and mock orders/promotions

import { Product, Shop, Category, Service } from './mockData';

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    promoDiscount: number;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
    createdAt: string;
    notes?: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Promotion {
    id: string;
    code: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minOrderValue: number;
    maxDiscount?: number;
    usageLimit: number;
    usedCount: number;
    isActive: boolean;
    validFrom: string;
    validUntil: string;
}

// Mock Orders
export const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'ORD-001',
        customerName: 'Rahul Singh',
        customerPhone: '+91 9876543210',
        customerAddress: 'Thangmeiband, Near City Hospital, Imphal',
        items: [
            { productId: '1', productName: 'Chicken Biryani', quantity: 2, price: 220 },
            { productId: '4', productName: 'Butter Chicken', quantity: 1, price: 280 },
        ],
        subtotal: 720,
        deliveryFee: 40,
        promoDiscount: 0,
        total: 760,
        status: 'pending',
        createdAt: '2026-02-04T10:30:00',
        notes: 'Extra spicy please',
    },
    {
        id: '2',
        orderNumber: 'ORD-002',
        customerName: 'Priya Devi',
        customerPhone: '+91 8765432109',
        customerAddress: 'Keishampat, Opposite HDFC Bank, Imphal',
        items: [
            { productId: '2', productName: 'Fresh Vegetables Box', quantity: 3, price: 150 },
        ],
        subtotal: 450,
        deliveryFee: 40,
        promoDiscount: 50,
        total: 440,
        status: 'confirmed',
        createdAt: '2026-02-04T09:15:00',
    },
    {
        id: '3',
        orderNumber: 'ORD-003',
        customerName: 'Tomba Meitei',
        customerPhone: '+91 7654321098',
        customerAddress: 'Paona Bazar, Shop No. 12, Imphal',
        items: [
            { productId: '3', productName: 'Premium Gift Basket', quantity: 1, price: 1299 },
        ],
        subtotal: 1299,
        deliveryFee: 40,
        promoDiscount: 0,
        total: 1339,
        status: 'out_for_delivery',
        createdAt: '2026-02-03T16:45:00',
    },
    {
        id: '4',
        orderNumber: 'ORD-004',
        customerName: 'Sana Kh',
        customerPhone: '+91 6543210987',
        customerAddress: 'Singjamei, Near Police Station, Imphal',
        items: [
            { productId: '1', productName: 'Chicken Biryani', quantity: 1, price: 220 },
        ],
        subtotal: 220,
        deliveryFee: 40,
        promoDiscount: 0,
        total: 260,
        status: 'delivered',
        createdAt: '2026-02-03T12:00:00',
    },
    {
        id: '5',
        orderNumber: 'ORD-005',
        customerName: 'Bobby Laishram',
        customerPhone: '+91 5432109876',
        customerAddress: 'Kakching, Main Road, Manipur',
        items: [
            { productId: '2', productName: 'Fresh Vegetables Box', quantity: 2, price: 150 },
            { productId: '4', productName: 'Butter Chicken', quantity: 2, price: 280 },
        ],
        subtotal: 860,
        deliveryFee: 50,
        promoDiscount: 100,
        total: 810,
        status: 'cancelled',
        createdAt: '2026-02-02T14:30:00',
        notes: 'Customer cancelled - changed mind',
    },
];

// Mock Promotions
export const mockPromotions: Promotion[] = [
    {
        id: '1',
        code: 'WELCOME10',
        description: '10% off on your first order',
        discountType: 'percentage',
        discountValue: 10,
        minOrderValue: 200,
        maxDiscount: 100,
        usageLimit: 1000,
        usedCount: 234,
        isActive: true,
        validFrom: '2026-01-01',
        validUntil: '2026-03-31',
    },
    {
        id: '2',
        code: 'FLAT50',
        description: 'Flat ₹50 off on orders above ₹300',
        discountType: 'fixed',
        discountValue: 50,
        minOrderValue: 300,
        usageLimit: 500,
        usedCount: 89,
        isActive: true,
        validFrom: '2026-02-01',
        validUntil: '2026-02-28',
    },
    {
        id: '3',
        code: 'BIGSAVE20',
        description: '20% off on orders above ₹1000',
        discountType: 'percentage',
        discountValue: 20,
        minOrderValue: 1000,
        maxDiscount: 300,
        usageLimit: 200,
        usedCount: 45,
        isActive: false,
        validFrom: '2026-01-15',
        validUntil: '2026-02-15',
    },
];

// Dashboard Stats
export interface DashboardStats {
    totalOrders: number;
    pendingOrders: number;
    todayRevenue: number;
    totalRevenue: number;
    totalProducts: number;
    totalShops: number;
    totalCategories: number;
    activePromotions: number;
}

export const getDashboardStats = (): DashboardStats => {
    const todayOrders = mockOrders.filter(o => o.createdAt.startsWith('2026-02-04'));
    const pendingOrders = mockOrders.filter(o => o.status === 'pending' || o.status === 'confirmed');

    return {
        totalOrders: mockOrders.length,
        pendingOrders: pendingOrders.length,
        todayRevenue: todayOrders.reduce((sum, o) => sum + o.total, 0),
        totalRevenue: mockOrders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0),
        totalProducts: 4, // From mockData
        totalShops: 3,
        totalCategories: 4,
        activePromotions: mockPromotions.filter(p => p.isActive).length,
    };
};

// Order status colors and labels
export const orderStatusConfig = {
    pending: { label: 'Pending', color: 'warning' },
    confirmed: { label: 'Confirmed', color: 'info' },
    preparing: { label: 'Preparing', color: 'info' },
    out_for_delivery: { label: 'Out for Delivery', color: 'accent' },
    delivered: { label: 'Delivered', color: 'success' },
    cancelled: { label: 'Cancelled', color: 'error' },
} as const;
