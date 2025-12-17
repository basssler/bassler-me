export default function Projects() {
    const projects = [
        {
            title: "Project One",
            description: "A cool project that does something amazing.",
            link: "#",
        },
        {
            title: "Project Two",
            description: "Another fantastic project showcasing my skills.",
            link: "#",
        },
        // Add more projects here
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <a href={project.link} className="text-blue-500 hover:underline">
                            View Project
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
