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
  href: string;
  icon: LucideIcon;
  newTab?: boolean;
};

const linkItems: LinkItem[] = [
  {
    label: "Portfolio",
    href: "/",
    icon: Home,
  },
  {
    label: "Selected Work",
    href: "/projects",
    icon: Briefcase,
  },
  {
    label: "Razorbook Reach",
    href: "https://basssler.github.io/razorbook-me/",
    icon: BookOpen,
    newTab: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/basssler",
    icon: Github,
    newTab: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxbassler/",
    icon: Linkedin,
    newTab: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/basssler/",
    icon: Instagram,
    newTab: true,
  },
  {
    label: "Email",
    href: "mailto:bassler@uark.edu",
    icon: Mail,
  },
];

const rowClassName =
  "group flex min-h-[4.5rem] items-center gap-4 rounded-sm border border-black/10 bg-white/35 px-4 py-3 text-left transition-[transform,background-color,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15 dark:bg-white/[0.03] dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:focus-visible:ring-white sm:min-h-20 sm:gap-5 sm:px-5";

function LinkRow({ item }: { item: LinkItem }) {
  const Icon = item.icon;
  const contents = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-black/10 transition-colors group-hover:border-current/25 dark:border-white/15 sm:size-11">
        <Icon className="size-[18px] sm:size-5" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-base font-semibold tracking-tight sm:text-lg">
        {item.label}
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

          <div className="mt-10 flex flex-col items-center text-center sm:mt-14">
            <div className="relative size-36 overflow-hidden rounded-[1.25rem] border border-black/10 bg-black/5 shadow-sm dark:border-white/15 dark:bg-white/5 sm:size-44">
              <Image
                src="/images/headshot.jpg"
                alt="Max Bassler"
                fill
                priority
                sizes="(min-width: 640px) 176px, 144px"
                className="object-cover object-[center_24%]"
              />
            </div>
            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 dark:text-white/45 sm:text-xs">
              Industrial Engineering
            </p>
            <h1 className="mt-2 text-[2.75rem] font-bold leading-[0.9] tracking-[-0.06em] text-black dark:text-white sm:text-6xl">
              Max Bassler
            </h1>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-black/70 dark:text-white/70 sm:text-xl">
              Building practical tools across software, data, and systems.
            </p>
          </div>
        </header>

        <nav aria-label="Max Bassler links" className="mt-8 grid gap-2.5 sm:mt-10 sm:gap-3">
          {linkItems.map((item) => (
            <LinkRow item={item} key={item.label} />
          ))}
        </nav>

        <footer className="mt-auto flex justify-center pt-8 text-[10px] font-medium uppercase tracking-[0.15em] text-black/45 dark:text-white/45 sm:pt-10 sm:text-xs">
          <span>bassler.me/go</span>
        </footer>
      </div>
    </main>
  );
}
