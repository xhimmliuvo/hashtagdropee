import { shops } from '@/data/mockData';
import ShopDetailClient from './ShopDetailClient';

export function generateStaticParams() {
    return shops.map((shop) => ({
        slug: shop.slug,
    }));
}

export default async function ShopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ShopDetailClient slug={slug} />;
}
