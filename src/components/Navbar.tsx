import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-background/90 backdrop-blur-sm border-b border-black/[0.03] dark:border-white/[0.03]">
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        <Link href="/" className="text-sm font-bold tracking-[0.1em] uppercase">
          Bassler.
        </Link>
        <div className="space-x-8 md:space-x-12 flex items-center">
          <Link href="/" className="text-xs font-medium tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">
            Index
          </Link>
          <Link href="/projects" className="text-xs font-medium tracking-[0.2em] uppercase hover:text-gray-500 transition-colors">
            Work
          </Link>
          <Link href="https://github.com/basssler" target="_blank" className="text-xs font-medium tracking-[0.2em] uppercase hover:text-gray-500 transition-colors hidden md:block">
            GitHub
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
