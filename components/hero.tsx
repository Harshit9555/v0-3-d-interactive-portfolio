"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Download } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number

    // Particle system for animated background
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(13, 13, 13, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/api/resume"
    link.download = "Harshit_Mishra_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a0d2e 50%, #0d0d0d 100%)" }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="gradient-text text-6xl md:text-8xl">Harshit Mishra</span>
            </h1>
            <p className="text-xl text-foreground/70">Full-Stack Developer | Engineering Student</p>
          </div>

          <p className="text-lg text-foreground/60 leading-relaxed max-w-lg">
            I design and develop modern web experiences that connect ideas with impact. Passionate about building
            efficient, user-friendly, and scalable applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:glow-cyan transition-all duration-300 group"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
            >
              <Download size={20} />
              Download Resume
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 pt-4">
            {[
              { label: "GitHub", href: "https://github.com/Harshit9555" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/harshit-mishra-2ab2b9278/" },
              { label: "Email", href: "mailto:harshitmishra8953@gmail.com" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - 3D Animated Element */}
        <div className="relative h-96 md:h-full flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Rotating 3D Cube Representation */}
            <div className="absolute inset-0 animate-float">
              <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
                <div
                  className="absolute inset-0 border-2 border-primary/50 rounded-lg glow-cyan"
                  style={{
                    animation: "rotateX 8s linear infinite",
                  }}
                />
                <div
                  className="absolute inset-8 border-2 border-secondary/50 rounded-lg glow-violet"
                  style={{
                    animation: "rotateY 6s linear infinite reverse",
                  }}
                />
                <div
                  className="absolute inset-16 border-2 border-accent/50 rounded-lg glow-pink"
                  style={{
                    animation: "rotateZ 4s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* Center Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="absolute w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-foreground/50">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotateX {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(360deg);
          }
        }
        @keyframes rotateY {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        @keyframes rotateZ {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }
      `}</style>
    </section>
  )
}
