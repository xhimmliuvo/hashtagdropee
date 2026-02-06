import { categories } from '@/data/mockData';
import CategoryProductsClient from './CategoryProductsClient';

export function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryProductsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <CategoryProductsClient slug={slug} />;
}
