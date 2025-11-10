"use client"

import { useEffect, useRef, useState } from "react"

interface Skill {
  name: string
  category: string
  level: number
}

const skillsData: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", level: 95 },
  { name: "TypeScript", category: "Frontend", level: 90 },
  { name: "Tailwind CSS", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Frontend", level: 90 },
  { name: "Framer Motion", category: "Frontend", level: 85 },

  // Backend
  { name: "Node.js", category: "Backend", level: 90 },
  { name: "Express.js", category: "Backend", level: 88 },
  { name: "MongoDB", category: "Backend", level: 85 },
  { name: "Firebase", category: "Backend", level: 88 },
  { name: "PostgreSQL", category: "Backend", level: 80 },

  // Languages
  { name: "JavaScript", category: "Languages", level: 95 },
  { name: "C++", category: "Languages", level: 85 },
  { name: "Python", category: "Languages", level: 80 },
  { name: "SQL", category: "Languages", level: 85 },

  // Tools
  { name: "Git & GitHub", category: "Tools", level: 90 },
  { name: "Docker", category: "Tools", level: 75 },
  { name: "REST APIs", category: "Tools", level: 90 },
  { name: "Vercel", category: "Tools", level: 85 },
]

const categories = ["Frontend", "Backend", "Languages", "Tools"]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const filteredSkills = skillsData.filter((skill) => skill.category === activeCategory)

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

    const elements = sectionRef.current?.querySelectorAll(".skill-card")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to build modern, scalable applications
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "bg-card border border-border text-foreground/70 hover:border-primary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="skill-card opacity-0 transition-all duration-500"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={`relative p-6 rounded-lg border transition-all duration-300 ${
                  hoveredSkill === skill.name
                    ? "bg-card border-primary/50 glow-cyan"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                {/* Skill Name */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{skill.name}</h3>
                  <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-700"
                    style={{
                      width: hoveredSkill === skill.name ? `${skill.level}%` : "0%",
                    }}
                  />
                </div>

                {/* Animated Dots */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        hoveredSkill === skill.name ? "bg-primary animate-pulse" : "bg-primary/30"
                      }`}
                      style={{
                        animationName: hoveredSkill === skill.name ? "pulse" : "none",
                        animationDuration: "1.5s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${dot * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Frontend Skills", value: "5+" },
            { label: "Backend Technologies", value: "5+" },
            { label: "Programming Languages", value: "4+" },
            { label: "Tools & Platforms", value: "4+" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300 hover:glow-cyan"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{item.value}</div>
              <p className="text-sm text-foreground/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skill-card.animate-in {
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

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  )
}
