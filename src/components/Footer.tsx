export default function Footer() {
    return (
        <footer className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-8 border-t border-black/[0.03] dark:border-white/[0.03] mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.15em] text-gray-500">
                <p>&copy; {new Date().getFullYear()} Bassler.</p>
                <div className="flex gap-6">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
                    <a href="https://www.linkedin.com/in/maxbassler/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                    <a href="mailto:bassler@uark.edu" className="hover:text-foreground transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
}
