import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Github,
  Home,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";

const description =
  "Portfolio, selected work, and ways to connect with Max Bassler.";

export const metadata: Metadata = {
  title: "Links",
  description,
  alternates: {
    canonical: "/go",
  },
  openGraph: {
    title: "Max Bassler | Links",
    description,
    url: "/go",
  },
};

type LinkItem = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  newTab?: boolean;
};

const linkItems: LinkItem[] = [
  {
    label: "Portfolio",
    description: "About, skills, and what I’m building",
    href: "/",
    icon: Home,
  },
  {
    label: "Selected Work",
    description: "Engineering, data, and web projects",
    href: "/projects",
    icon: Briefcase,
  },
  {
    label: "Razorbook Reach",
    description: "Expanding access to books and literacy support",
    href: "https://basssler.github.io/razorbook-me/",
    icon: BookOpen,
    newTab: true,
  },
  {
    label: "GitHub",
    description: "Code, experiments, and open source",
    href: "https://github.com/basssler",
    icon: Github,
    newTab: true,
  },
  {
    label: "LinkedIn",
    description: "Experience, leadership, and updates",
    href: "https://www.linkedin.com/in/maxbassler/",
    icon: Linkedin,
    newTab: true,
  },
  {
    label: "Instagram",
    description: "Follow @basssler",
    href: "https://www.instagram.com/basssler/",
    icon: Instagram,
    newTab: true,
  },
  {
    label: "Email",
    description: "bassler@uark.edu",
    href: "mailto:bassler@uark.edu",
    icon: Mail,
  },
];

const rowClassName =
  "group flex min-h-20 items-center gap-4 rounded-sm border border-black/10 bg-white/35 px-4 py-4 text-left transition-[transform,background-color,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15 dark:bg-white/[0.03] dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:focus-visible:ring-white sm:min-h-24 sm:gap-5 sm:px-5";

function LinkRow({ item, index }: { item: LinkItem; index: number }) {
  const Icon = item.icon;
  const contents = (
    <>
      <span className="font-mono text-[10px] text-black/40 transition-colors group-hover:text-current dark:text-white/40 sm:text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-black/10 transition-colors group-hover:border-current/25 dark:border-white/15 sm:size-11">
        <Icon className="size-[18px] sm:size-5" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold tracking-tight sm:text-lg">
          {item.label}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-black/55 transition-colors group-hover:text-current/70 dark:text-white/55 sm:text-sm">
          {item.description}
        </span>
      </span>
      <ArrowUpRight
        className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-6"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </>
  );

  if (item.href.startsWith("/")) {
    return (
      <Link href={item.href} className={rowClassName}>
        {contents}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      className={rowClassName}
      target={item.newTab ? "_blank" : undefined}
      rel={item.newTab ? "noopener noreferrer" : undefined}
    >
      {contents}
    </a>
  );
}

export default function LinksPage() {
  return (
    <main className="min-h-screen w-full px-5 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-2xl flex-col sm:min-h-[calc(100vh-4rem)]">
        <header>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-[0.1em] text-black transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:text-white dark:focus-visible:ring-white"
            >
              Bassler.
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-10 grid grid-cols-[5.5rem_1fr] items-end gap-5 sm:mt-14 sm:grid-cols-[7rem_1fr] sm:gap-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5">
              <Image
                src="/images/headshot.jpg"
                alt="Max Bassler"
                fill
                priority
                sizes="(min-width: 640px) 112px, 88px"
                className="object-cover object-[center_26%]"
              />
            </div>
            <div className="pb-0.5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 dark:text-white/45 sm:text-xs">
                Engineering × Business
              </p>
              <h1 className="text-4xl font-bold leading-[0.9] tracking-[-0.06em] text-black dark:text-white sm:text-6xl">
                Max Bassler
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-black/70 dark:text-white/70 sm:mt-8 sm:text-xl">
            Engineering and Business student bridging technical execution with
            strategic vision.
          </p>
        </header>

        <nav aria-label="Max Bassler links" className="mt-8 grid gap-2.5 sm:mt-10 sm:gap-3">
          {linkItems.map((item, index) => (
            <LinkRow item={item} index={index} key={item.label} />
          ))}
        </nav>

        <footer className="mt-auto flex items-center justify-between gap-4 pt-8 text-[10px] font-medium uppercase tracking-[0.15em] text-black/45 dark:text-white/45 sm:pt-10 sm:text-xs">
          <span>bassler.me/go</span>
          <span>&copy; {new Date().getFullYear()} Bassler.</span>
        </footer>
      </div>
    </main>
  );
}
