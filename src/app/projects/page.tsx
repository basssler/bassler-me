import Link from 'next/link';
import { projects } from './data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Selected Works',
    description: 'A curated collection of engineering projects, data analysis, and web applications including Housing Cluster Analysis and Literacy Data initiatives.',
};

export default function Projects() {
    return (
        <div className="space-y-16">
            <header className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-12">
                    <h1 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 !text-black dark:text-gray-400">Selected Works</h1>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {projects.map((project, index) => (
                    <Link
                        href={project.externalLink || `/projects/${project.slug}`}
                        key={index}
                        className="group cursor-pointer space-y-4 block"
                        target={project.externalLink ? "_blank" : undefined}
                        rel={project.externalLink ? "noopener noreferrer" : undefined}
                    >
                        {/* Thumbnail */}
                        <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-colors w-full overflow-hidden rounded-sm relative">
                            {project.thumbnail && (
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                />
                            )}
                        </div>

                        <div className="flex justify-between items-baseline border-b border-gray-200 dark:border-gray-800 pb-2">
                            <h2 className="text-xl font-bold tracking-tight !text-black dark:text-gray-100">{project.title}</h2>
                            <span className="text-xs text-black dark:text-gray-400 font-mono">{project.year}</span>
                        </div>
                        <div className="flex justify-between items-start text-sm !text-black dark:text-gray-400">
                            <span>{project.category}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
