"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  liveLink: string
  githubLink: string
  featured: boolean
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "WorkersHire",
    description: "Platform to hire skilled workers nearby with real-time matching",
    longDescription:
      "A comprehensive platform connecting skilled workers with clients in their locality. Features include real-time location tracking, skill-based matching, secure payments, and rating system.",
    technologies: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
    image: "/workers-hire-platform.jpg",
    liveLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Blood Donation Management System",
    description: "Real-time donor tracking and blood bank management platform",
    longDescription:
      "A complete blood donation management system with real-time donor availability, blood inventory tracking, emergency alerts, and hospital integration.",
    technologies: ["React", "Firebase", "Firestore", "Google Maps API", "Tailwind CSS"],
    image: "/blood-donation-system.jpg",
    liveLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 3,
    title: "AnonSathi",
    description: "Anonymous mental health support and counseling platform",
    longDescription:
      "A safe space for anonymous mental health discussions with AI-powered support suggestions, community forums, and professional counselor connections.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Socket.io", "Tailwind CSS"],
    image: "/mental-health-platform.jpg",
    liveLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Full-featured online shopping platform with payment integration",
    longDescription:
      "Complete e-commerce solution with product catalog, shopping cart, secure checkout, order tracking, and admin dashboard for inventory management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    image: "/ecommerce-platform.jpg",
    liveLink: "#",
    githubLink: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    longDescription:
      "A productivity tool for teams to manage tasks, set deadlines, collaborate in real-time, and track project progress with visual dashboards.",
    technologies: ["React", "Firebase", "Tailwind CSS", "React Query"],
    image: "/task-management-app.jpg",
    liveLink: "#",
    githubLink: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "Real-time weather information with interactive maps",
    longDescription:
      "A beautiful weather application with real-time data, 7-day forecasts, interactive maps, and weather alerts for multiple locations.",
    technologies: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS"],
    image: "/weather-dashboard.jpg",
    liveLink: "#",
    githubLink: "#",
    featured: false,
  },
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")
  const sectionRef = useRef<HTMLDivElement>(null)

  const filteredProjects = filter === "featured" ? projectsData.filter((p) => p.featured) : projectsData

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".project-card")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Showcasing my best work across different domains and technologies
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-primary text-primary-foreground glow-cyan"
                : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === "featured"
                ? "bg-primary text-primary-foreground glow-cyan"
                : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}
          >
            Featured
          </button>
        </div>

        {/* Projects Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card opacity-0 transition-all duration-500"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`relative h-full rounded-lg border overflow-hidden transition-all duration-300 ${
                  hoveredProject === project.id
                    ? "bg-card border-primary/50 glow-cyan"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transform: hoveredProject === project.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-foreground/70 text-sm">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/30">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <a
                      href={project.liveLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300 text-sm font-semibold"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                    <a
                      href={project.githubLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-all duration-300 text-sm font-semibold"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold border border-accent/50">
                    Featured
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card.animate-in {
          animation: slideUp 0.6s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
