export default function Home() {
  return (
    <div className="space-y-24 md:space-y-40">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-12">
        <div className="md:col-span-8 lg:col-span-9">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
            BASSLER<span className="!text-black dark:!text-white">.</span>
          </h1>
          <p className="text-xl md:text-3xl leading-snug max-w-3xl font-light !text-black dark:!text-white">
            Creative developer building digital experiences with a focus on minimalism, scalability, and precision.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 lg:col-span-3">
          {/* Headshot */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm w-full">
            <img
              src="/images/headshot.jpg"
              alt="Max Bassler"
              className="object-cover w-full h-full transition-all duration-500"
            />
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-end h-full">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 !text-black dark:!text-white">About</h2>
          <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            <p>
              Current Engineering and Business student at the University of Arkansas majoring in Industrial Engineering and Operation Analytics and Supply Chain Management.
            </p>
            <p>
              I bridge the gap between technical execution and strategic vision. As a Software Developer for Wurst Plus Three, I've built solutions reaching over 24,000 users. I'm also the Founder of Razorbook Reach, leading initiatives to improve literacy access.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 !text-black dark:!text-white">Skills</h2>
          <ul className="space-y-2 text-sm md:text-base font-medium">
            <li>Java & JavaScript</li>
            <li>Python & C#</li>
            <li>React & Next.js</li>
            <li>Vaadin & Google Maps API</li>
            <li>Data Analysis & Visualization</li>
          </ul>
        </div>
        <div className="lg:col-span-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 !text-black dark:!text-white">Connect</h2>
          <ul className="space-y-2 text-sm md:text-base font-medium">
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              <a href="https://github.com/basssler" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              <a href="https://www.linkedin.com/in/maxbassler/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              <a href="mailto:bassler@uark.edu">Email</a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-4 flex items-end justify-start lg:justify-end">
          <a href="/projects" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]">
            View All Work
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
