import { notFound } from 'next/navigation';
import { projects } from '../data';
import Link from 'next/link';

// Correctly type the props for a Next.js dynamic page
// params is a Promise in recent Next.js versions, but for simple static generation or standard SSR it's often passed directly.
// However, sticking to the standard async component pattern is safest.
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto pt-12 md:pt-20 space-y-12"> {/* Constrained width for readability */}
            <header className="space-y-6">
                <div className="flex flex-col gap-2">
                    <Link href="/projects" className="text-xs font-bold uppercase tracking-[0.2em] !text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                        ← Back to Projects
                    </Link>
                    <span className="text-sm font-mono !text-black dark:!text-white">{project.category} / {project.year}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{project.title}</h1>
                <p className="text-lg md:text-xl font-light !text-black dark:!text-white leading-relaxed">
                    {project.description}
                </p>
                {project.image && (
                    <div className="w-full mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                        <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
                    </div>
                )}
            </header>

            <article className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                {project.content.map((block, index) => {
                    switch (block.type) {
                        case 'header':
                            return <h2 key={index} className="text-xl md:text-2xl font-bold mt-12 mb-4 tracking-tight !text-black dark:!text-white">{block.text}</h2>;
                        case 'sub-header':
                            return <h3 key={index} className="text-lg font-semibold mt-8 mb-2 !text-black dark:!text-white">{block.text}</h3>;
                        case 'paragraph':
                            return <p key={index} className="text-base !text-black dark:!text-white leading-relaxed">{block.text}</p>;
                        case 'list':
                            return (
                                <ul key={index} className="list-disc pl-5 space-y-2 text-base !text-black dark:!text-white leading-relaxed">
                                    {block.items?.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            );
                        default:
                            return null;
                    }
                })}
            </article>
        </div>
    );
}

// Generate static params for export if needed, or just for optimization
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}
