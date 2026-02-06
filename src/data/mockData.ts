// Mock data for development - will be replaced with Supabase

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    productCount: number;
}

export interface Shop {
    id: string;
    name: string;
    slug: string;
    logo: string;
    rating: number;
    locationTag: string;
    deliveryFee: number;
    estimatedTime: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    description: string;
    images: string[];
    categoryId: string;
    shopId: string;
    rating: number;
    reviewCount: number;
    availability: boolean;
}

export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
    pricingType: 'fixed' | 'distance' | 'custom';
    basePrice?: number;
    fields: ServiceField[];
}

export interface ServiceField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'dropdown';
    required: boolean;
    options?: string[];
}

// Categories
export const categories: Category[] = [
    {
        id: '1',
        name: 'Food',
        slug: 'food',
        description: 'Delicious meals from local restaurants',
        image: '/images/categories/food.jpg',
        productCount: 45,
    },
    {
        id: '2',
        name: 'Grocery',
        slug: 'grocery',
        description: 'Fresh produce and daily essentials',
        image: '/images/categories/grocery.jpg',
        productCount: 120,
    },
    {
        id: '3',
        name: 'Gifts',
        slug: 'gifts',
        description: 'Perfect presents for every occasion',
        image: '/images/categories/gifts.jpg',
        productCount: 35,
    },
    {
        id: '4',
        name: 'Custom Delivery',
        slug: 'custom-delivery',
        description: 'Send anything, anywhere',
        image: '/images/categories/custom.jpg',
        productCount: 0,
    },
];

// Shops
export const shops: Shop[] = [
    {
        id: '1',
        name: 'Fresh Kitchen',
        slug: 'fresh-kitchen',
        logo: '/images/shops/fresh-kitchen.jpg',
        rating: 4.8,
        locationTag: 'Thangmeiband',
        deliveryFee: 30,
        estimatedTime: '25-35 min',
    },
    {
        id: '2',
        name: 'Green Mart',
        slug: 'green-mart',
        logo: '/images/shops/green-mart.jpg',
        rating: 4.6,
        locationTag: 'Keishampat',
        deliveryFee: 25,
        estimatedTime: '30-45 min',
    },
    {
        id: '3',
        name: 'Gift Gallery',
        slug: 'gift-gallery',
        logo: '/images/shops/gift-gallery.jpg',
        rating: 4.9,
        locationTag: 'Paona Bazar',
        deliveryFee: 40,
        estimatedTime: '45-60 min',
    },
];

// Products
export const products: Product[] = [
    {
        id: '1',
        name: 'Chicken Biryani',
        slug: 'chicken-biryani',
        price: 250,
        discountPrice: 220,
        description: 'Aromatic basmati rice cooked with tender chicken pieces and special spices.',
        images: ['/images/products/biryani.jpg'],
        categoryId: '1',
        shopId: '1',
        rating: 4.7,
        reviewCount: 125,
        availability: true,
    },
    {
        id: '2',
        name: 'Fresh Vegetables Box',
        slug: 'fresh-vegetables-box',
        price: 150,
        description: 'Assorted fresh vegetables sourced from local farms.',
        images: ['/images/products/vegetables.jpg'],
        categoryId: '2',
        shopId: '2',
        rating: 4.5,
        reviewCount: 89,
        availability: true,
    },
    {
        id: '3',
        name: 'Premium Gift Basket',
        slug: 'premium-gift-basket',
        price: 1500,
        discountPrice: 1299,
        description: 'Curated selection of chocolates, dry fruits, and premium items.',
        images: ['/images/products/gift-basket.jpg'],
        categoryId: '3',
        shopId: '3',
        rating: 4.9,
        reviewCount: 47,
        availability: true,
    },
    {
        id: '4',
        name: 'Butter Chicken',
        slug: 'butter-chicken',
        price: 280,
        description: 'Creamy tomato-based curry with tender chicken pieces.',
        images: ['/images/products/butter-chicken.jpg'],
        categoryId: '1',
        shopId: '1',
        rating: 4.8,
        reviewCount: 203,
        availability: true,
    },
];

// Services
export const services: Service[] = [
    {
        id: '1',
        name: 'Pick & Drop',
        slug: 'pick-drop',
        description: 'We pick up from one location and drop to another. Perfect for documents, small packages, and items you forgot somewhere.',
        icon: 'Package',
        image: '/images/services/pick-drop.jpg',
        pricingType: 'distance',
        basePrice: 50,
        fields: [
            { id: 'pickup', label: 'Pickup Address', type: 'textarea', required: true },
            { id: 'drop', label: 'Drop Address', type: 'textarea', required: true },
            { id: 'item', label: 'Item Description', type: 'text', required: true },
            { id: 'urgency', label: 'Urgency', type: 'dropdown', required: false, options: ['Normal', 'Urgent', 'Same Hour'] },
        ],
    },
    {
        id: '2',
        name: 'Document Delivery',
        slug: 'document-delivery',
        description: 'Safe and secure delivery of important documents. We handle with care.',
        icon: 'FileText',
        image: '/images/services/document.jpg',
        pricingType: 'fixed',
        basePrice: 80,
        fields: [
            { id: 'pickup', label: 'Pickup Address', type: 'textarea', required: true },
            { id: 'drop', label: 'Drop Address', type: 'textarea', required: true },
            { id: 'docType', label: 'Document Type', type: 'text', required: false },
        ],
    },
    {
        id: '3',
        name: 'Custom Errands',
        slug: 'custom-errands',
        description: 'Need something done? We can help with various errands - shopping, bill payments, and more.',
        icon: 'Clipboard',
        image: '/images/services/errands.jpg',
        pricingType: 'custom',
        fields: [
            { id: 'task', label: 'Describe your task', type: 'textarea', required: true },
            { id: 'location', label: 'Location(s) involved', type: 'textarea', required: true },
            { id: 'time', label: 'Preferred Time', type: 'dropdown', required: false, options: ['Today', 'Tomorrow', 'This Week'] },
        ],
    },
    {
        id: '4',
        name: 'Bulk / Business Delivery',
        slug: 'bulk-delivery',
        description: 'For businesses and bulk orders. Contact us for custom pricing and dedicated service.',
        icon: 'Truck',
        image: '/images/services/bulk.jpg',
        pricingType: 'custom',
        fields: [
            { id: 'business', label: 'Business Name', type: 'text', required: true },
            { id: 'details', label: 'Delivery Requirements', type: 'textarea', required: true },
            { id: 'frequency', label: 'Frequency', type: 'dropdown', required: false, options: ['One-time', 'Daily', 'Weekly', 'Monthly'] },
        ],
    },
];
