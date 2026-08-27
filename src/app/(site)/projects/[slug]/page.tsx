import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { projects } from '../data';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

function isInternalUrl(url: string) {
    return url.startsWith('/') || url.startsWith('#');
}

function ProjectActionLink({ href, label }: { href: string; label: string }) {
    const className = "inline-flex items-center justify-center border border-gray-200 dark:border-gray-800 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] !text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors";

    if (isInternalUrl(href)) {
        return (
            <Link href={href} className={className}>
                {label}
            </Link>
        );
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {label}
        </a>
    );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    if (project.draft) {
        return {
            title: 'Draft Project',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.image ? [{ url: project.image }] : undefined,
            type: 'article',
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projectIndex >= 0 ? projects[projectIndex] : undefined;

    if (!project) {
        notFound();
    }

    const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
    const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;
    const actionLinks = [
        project.liveDemoUrl ? { href: project.liveDemoUrl, label: 'Live Demo' } : null,
        project.githubUrl ? { href: project.githubUrl, label: 'GitHub' } : null,
        project.writeupUrl ? { href: project.writeupUrl, label: 'Project Writeup' } : null,
    ].filter((action): action is { href: string; label: string } => Boolean(action));

    return (
        <div className="max-w-3xl mx-auto pt-12 md:pt-20 space-y-14">
            <header className="space-y-6">
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-mono !text-black dark:!text-white">{project.category} / {project.year}</span>
                    <nav className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.16em]">
                        <Link href="/projects" className="!text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                            Back to Projects
                        </Link>
                        {previousProject && (
                            <Link href={`/projects/${previousProject.slug}`} className="!text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                                Previous Project
                            </Link>
                        )}
                        {nextProject && (
                            <Link href={`/projects/${nextProject.slug}`} className="!text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                                Next Project
                            </Link>
                        )}
                    </nav>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{project.title}</h1>
                <p className="text-lg md:text-xl font-light !text-black dark:!text-white leading-relaxed">
                    {project.description}
                </p>
                {actionLinks.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-2">
                        {actionLinks.map((action) => (
                            <ProjectActionLink key={`${project.slug}-${action.label}`} href={action.href} label={action.label} />
                        ))}
                    </div>
                )}
                {project.image && (
                    <div className="w-full mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                        <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
                    </div>
                )}
            </header>

            <article className="prose prose-lg dark:prose-invert max-w-none space-y-10">
                {project.content.map((block, index) => {
                    const isWriteupHeader =
                        project.slug === 'normal-loss-visualizer' &&
                        block.type === 'header' &&
                        block.text === 'Overview';

                    switch (block.type) {
                        case 'header':
                            return (
                                <h2
                                    key={index}
                                    id={isWriteupHeader ? 'writeup' : undefined}
                                    className="text-xl md:text-2xl font-bold mt-12 mb-4 tracking-tight !text-black dark:!text-white scroll-mt-28"
                                >
                                    {block.text}
                                </h2>
                            );
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

            {project.screenshots && project.screenshots.length > 0 && (
                <section className="space-y-8 md:space-y-10 pt-4">
                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight !text-black dark:!text-white">
                            Product Screens
                        </h2>
                        <p className="max-w-2xl text-base md:text-lg !text-black dark:!text-white leading-relaxed">
                            These views show how the app moves from concept to decision support: first explaining the model, then visualizing the distribution, and finally comparing policy choices on cost.
                        </p>
                    </div>
                    <div className="space-y-12 md:space-y-16">
                        {project.screenshots.map((shot, index) => (
                            <figure key={`${project.slug}-shot-${index}`} className="space-y-5 md:space-y-6">
                                {shot.src ? (
                                    <div className="md:-mx-10 lg:-mx-16 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg bg-gray-50 dark:bg-gray-900">
                                        <img src={shot.src} alt={shot.alt} className="w-full h-auto object-contain" />
                                    </div>
                                ) : (
                                    <div className="md:-mx-10 lg:-mx-16 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/60 px-6 py-10">
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                                            Screenshot placeholder
                                        </p>
                                        <p className="mt-2 text-base !text-black dark:!text-white">
                                            Add the image file for “{shot.title}” to render this screen here.
                                        </p>
                                    </div>
                                )}
                                <figcaption className="space-y-2 md:space-y-3">
                                    <h3 className="text-lg md:text-xl font-semibold !text-black dark:!text-white">{shot.title}</h3>
                                    <p className="max-w-2xl text-base md:text-lg !text-black dark:!text-white leading-relaxed">{shot.description}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>
            )}

            <nav className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.16em]">
                <Link href="/projects" className="!text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                    Back to Projects
                </Link>
                {previousProject && (
                    <Link href={`/projects/${previousProject.slug}`} className="!text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                        Previous Project
                    </Link>
                )}
                {nextProject && (
                    <Link href={`/projects/${nextProject.slug}`} className="!text-black dark:!text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                        Next Project
                    </Link>
                )}
            </nav>
        </div>
    );
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}
