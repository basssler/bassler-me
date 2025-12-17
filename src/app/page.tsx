export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
      <p className="text-xl text-gray-600 max-w-2xl">
        I am a passionate developer building amazing things for the web.
        Check out my projects to see what I've been working on.
      </p>
      <div className="flex gap-4">
        <a
          href="/projects"
          className="rounded-full bg-foreground text-background px-6 py-3 hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
        >
          View Projects
        </a>
        <a
          href="https://github.com/basssler"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] px-6 py-3 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
