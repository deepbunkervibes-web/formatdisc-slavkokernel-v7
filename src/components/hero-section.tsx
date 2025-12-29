"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, Terminal } from "lucide-react"
import { useEffect, useState } from "react"

function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute rounded-full bg-primary/30"
      style={{
        left: `${x}%`,
        bottom: "-10px",
        width: `${size}px`,
        height: `${size}px`,
        animation: `particle ${8 + Math.random() * 4}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [displayed, setDisplayed] = useState("0")
  const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ""))

  useEffect(() => {
    if (isNaN(numericValue)) {
      setDisplayed(value)
      return
    }

    const start = 0
    const end = numericValue
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * eased)

      if (value.includes("%")) setDisplayed(`${current}%`)
      else if (value.includes("s")) setDisplayed(`< ${current}s`)
      else setDisplayed(current.toString())

      if (progress < 1) requestAnimationFrame(animate)
      else setDisplayed(value)
    }

    const timeout = setTimeout(animate, 500)
    return () => clearTimeout(timeout)
  }, [value, numericValue])

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/80 hover-lift">
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <div className="relative">
        <div className="text-2xl font-bold text-foreground md:text-3xl gradient-text-animated">{displayed}</div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

function OrbitingElement({ delay, size, distance }: { delay: number; size: number; distance: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full bg-primary/20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animation: `orbit ${20 + delay * 5}s linear infinite`,
        animationDelay: `${delay}s`,
        transformOrigin: "center center",
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`,
      }}
    />
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="hero-container relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background animate-aurora" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f3a_1px,transparent_1px),linear-gradient(to_bottom,#1f1f3a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
        <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-glow-line" />
      </div>

      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Particle key={i} delay={i * 0.5} x={Math.random() * 100} size={4 + Math.random() * 4} />
          ))}
        </div>
      )}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-30">
        <OrbitingElement delay={0} size={8} distance={150} />
        <OrbitingElement delay={5} size={6} distance={200} />
        <OrbitingElement delay={10} size={10} distance={250} />
      </div>

      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-morph" />
      <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-morph delay-1000" />

      <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 animate-beam" />
      <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 animate-beam delay-500" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32">
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm transition-all duration-700 ${mounted ? "animate-scale-in opacity-100" : "opacity-0"}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">One Click Deploy Ready</span>
          </div>

          <h1
            className={`max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl transition-all duration-1000 ${mounted ? "animate-text-reveal" : "opacity-0"}`}
          >
            <span className="inline-block">One Design.</span> <span className="inline-block delay-100">One CLI.</span>{" "}
            <span className="inline-block gradient-text-animated text-glow delay-200">One Click.</span>
          </h1>

          <p
            className={`mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl transition-all duration-1000 delay-300 ${mounted ? "animate-slide-up" : "opacity-0"}`}
          >
            Deterministic deployment governance for modern teams. Transform your data formatting workflow with
            auditable, reproducible pipelines.
          </p>

          <div
            className={`mt-10 flex flex-col gap-4 sm:flex-row transition-all duration-1000 delay-500 ${mounted ? "animate-slide-up" : "opacity-0"}`}
          >
            <Button
              size="lg"
              className="primary-cta min-h-[44px] gap-2 px-6 relative overflow-hidden group animate-pulse-glow"
              asChild
            >
              <Link href="/demo">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Rocket className="h-5 w-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative">Start 48h Simulation</span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="secondary-cta min-h-[44px] gap-2 px-6 relative overflow-hidden group hover-glow"
              asChild
            >
              <Link href="/one-cli">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Terminal className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="relative">View ONE CLI Docs</span>
              </Link>
            </Button>
          </div>

          <div
            className={`mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4 transition-all duration-1000 delay-700 ${mounted ? "animate-slide-up" : "opacity-0"}`}
          >
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "< 2s", label: "Deploy Time" },
              { value: "100%", label: "Audit Trail" },
              { value: "Zero", label: "Config Drift" },
            ].map((stat, index) => (
              <div key={stat.label} style={{ animationDelay: `${800 + index * 100}ms` }}>
                <AnimatedCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
