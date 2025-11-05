"use client"

import { useEffect, useRef } from "react"

interface TimelineItem {
  title: string
  description: string
  type: "education" | "achievement"
}

const timelineData: TimelineItem[] = [
  {
    title: "Engineering Student",
    description: "Pursuing degree in Computer Science & Engineering with focus on full-stack development",
    type: "education",
  },
  {
    title: "Full-Stack Development Mastery",
    description: "Completed advanced projects in React, Node.js, MongoDB, and Firebase",
    type: "achievement",
  },
  {
    title: "Started Web Development Journey",
    description: "Began learning web development with HTML, CSS, and JavaScript fundamentals",
    type: "education",
  },
  {
    title: "Multiple Project Launches",
    description: "Successfully deployed WorkersHire, Blood Donation System, and AnonSathi platforms",
    type: "achievement",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("opacity-0")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".timeline-item")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            I'm Harshit Mishra, an engineering student passionate about crafting digital solutions through technology. I
            specialize in full-stack web development, focusing on building efficient, user-friendly, and scalable
            applications.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left - Profile Image Area */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 glow-cyan animate-pulse-glow" />
              <div className="absolute inset-4 rounded-2xl border-2 border-secondary/20 glow-violet" />

              {/* Profile Image Placeholder */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-2">HM</div>
                  <p className="text-foreground/50 text-sm">Full-Stack Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - About Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">My Journey</h3>
              <p className="text-foreground/70 leading-relaxed">
                Starting from curiosity about how websites work, I've evolved into a passionate full-stack developer. My
                journey has been marked by continuous learning, building real-world projects, and solving complex
                problems.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">What I Do</h3>
              <ul className="space-y-3">
                {[
                  "Design and develop responsive web applications",
                  "Build scalable backend systems with Node.js and databases",
                  "Create interactive user interfaces with React and modern frameworks",
                  "Implement real-time features using Firebase and WebSockets",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 text-foreground/70">
                    <span className="text-primary font-bold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Timeline</h3>

          <div className="relative" ref={sectionRef}>
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item opacity-0 transition-all duration-700 ${
                    index % 2 === 0 ? "md:ml-auto md:w-1/2 md:pr-12" : "md:w-1/2 md:pl-12"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background glow-cyan" />
                  </div>

                  {/* Content Card */}
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:glow-cyan">
                    <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
