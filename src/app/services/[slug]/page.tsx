import { services } from '@/data/mockData';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ServiceDetailClient slug={slug} />;
}
