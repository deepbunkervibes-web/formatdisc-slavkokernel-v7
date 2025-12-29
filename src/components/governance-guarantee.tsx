import type React from "react"

import { Shield, FileCheck, History, Lock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const guarantees = [
  {
    icon: Shield,
    title: "Immutable Specifications",
    description: "Every deployment is backed by a cryptographically signed specification. No surprises, no drift.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Logs",
    description: "Complete audit trail for every run. JSON entries with timestamps, spec-hashes, and status codes.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: History,
    title: "Instant Rollback",
    description: "One-click rollback to any previous stable state. Tagged releases ensure you're never stuck.",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Zero-Trust Pipeline",
    description: "CSP headers, HSTS, and secure defaults. Your deployments are protected at every layer.",
    color: "from-cyan-500 to-sky-500",
  },
]

function GuaranteeCard({ item, index }: { item: (typeof guarantees)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transform,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
      />

      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/20 group-hover:via-primary/10 group-hover:to-primary/0 group-hover:opacity-100" />

      <div className="absolute left-0 top-0 h-px w-full -translate-x-full bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      <div className="relative">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
          <item.icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-xl border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/30 group-hover:scale-125 group-hover:opacity-0" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </div>
  )
}

export function GovernanceGuarantee() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="governance"
      className="governance-guarantee relative border-b border-border py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl animate-morph" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            <span className="gradient-text-animated">Governance</span> Guarantee
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Enterprise-grade compliance without enterprise complexity. Every deployment is deterministic, auditable, and
            reversible.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item, index) => (
            <GuaranteeCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
