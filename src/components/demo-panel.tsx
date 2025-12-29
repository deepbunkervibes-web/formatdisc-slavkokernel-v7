"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paintbrush, Terminal, Rocket, ArrowRight, Check, Download, Copy } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: Paintbrush,
    title: "One Design",
    description: "Define your data transformation spec once",
  },
  {
    number: 2,
    icon: Terminal,
    title: "One CLI",
    description: "Run deterministic simulations locally",
  },
  {
    number: 3,
    icon: Rocket,
    title: "One Click",
    description: "Deploy to production with full audit trail",
  },
]

function TypingText({ text, isVisible }: { text: string; isVisible: boolean }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("")
      return
    }

    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [text, isVisible])

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && isVisible && <span className="animate-pulse text-primary">|</span>}
    </span>
  )
}

function TerminalLine({
  text,
  delay,
  type = "output",
}: { text: string; delay: number; type?: "output" | "success" | "command" }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  const colorClass = type === "success" ? "text-green-500" : type === "command" ? "text-primary" : "text-primary"

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <span className={colorClass}>{type === "command" ? "$" : ">"}</span>{" "}
      {type === "command" ? <TypingText text={text} isVisible={isVisible} /> : text}
    </div>
  )
}

export function DemoPanel() {
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "completed">("idle")
  const [copied, setCopied] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
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

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [isVisible])

  const handleStartSimulation = () => {
    setSimulationState("running")
    setTimeout(() => {
      setSimulationState("completed")
    }, 3500)
  }

  const handleGenerateCLI = () => {
    const script = `#!/bin/bash
# FormatDisc One-Click Deploy Script
# Generated: ${new Date().toISOString()}

one deploy --spec=prod.yml --env=production --artefact=demo-${Date.now()}
`
    const blob = new Blob([script], { type: "application/x-sh" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "one-cli.sh"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("one simulate --artefact=demo.json --max-time=300")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={sectionRef} id="demo" className="demo-triad-panel relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            How It <span className="gradient-text-animated">Works</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From design to production in three deterministic steps
          </p>
        </div>

        <div
          className={`mt-12 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <div className="flex flex-col items-center text-center group">
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-500 ${activeStep === index ? "border-primary bg-primary/20 scale-110 shadow-lg shadow-primary/30" : "border-primary/50 bg-primary/10"}`}
                >
                  {activeStep === index && (
                    <>
                      <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                      <span className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
                    </>
                  )}
                  <step.icon
                    className={`h-8 w-8 transition-all duration-500 ${activeStep === index ? "text-primary scale-110" : "text-primary/70"}`}
                  />
                  <span
                    className={`absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${activeStep === index ? "bg-primary text-primary-foreground scale-110" : "bg-primary/80 text-primary-foreground"}`}
                  >
                    {step.number}
                  </span>
                </div>
                <h3
                  className={`mt-4 font-semibold transition-colors duration-300 ${activeStep === index ? "text-primary" : "text-foreground"}`}
                >
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[150px] text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="relative mx-6 hidden md:block">
                  <div
                    className={`absolute inset-0 flex items-center transition-all duration-500 ${activeStep > index ? "opacity-100" : "opacity-30"}`}
                  >
                    <div className="h-px w-16 bg-gradient-to-r from-primary to-primary/0" />
                  </div>
                  <ArrowRight
                    className={`h-6 w-6 transition-all duration-500 ${activeStep > index ? "text-primary translate-x-1" : "text-muted-foreground"}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className={`mt-16 overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-1000 delay-400 hover-glow ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" />
            <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500/60 transition-colors hover:bg-green-500" />
            <span className="ml-2 font-mono text-sm text-muted-foreground">formatdisc-simulation</span>
            {simulationState === "running" && (
              <span className="ml-auto flex items-center gap-2 text-xs text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Running...
              </span>
            )}
          </div>

          <div className="relative p-6 scanlines">
            <div className="font-mono text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">$</span>
                <span className="text-foreground">one simulate --artefact=demo.json --max-time=300</span>
                <button
                  onClick={handleCopyCommand}
                  className="ml-2 rounded p-1.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-110"
                  aria-label="Copy command"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {simulationState === "idle" && (
                <div className="mt-4 text-muted-foreground animate-pulse">Ready to start simulation...</div>
              )}

              {simulationState === "running" && (
                <div className="mt-4 space-y-2">
                  <TerminalLine text="Initializing simulation environment..." delay={100} />
                  <TerminalLine text="Loading artefact: demo.json" delay={600} />
                  <TerminalLine text="Validating specification hash..." delay={1100} />
                  <TerminalLine text="Running validation checks..." delay={1600} />
                  <div className="flex items-center gap-2 text-primary mt-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span className="animate-pulse">Processing...</span>
                  </div>
                </div>
              )}

              {simulationState === "completed" && (
                <div className="mt-4 space-y-2">
                  <TerminalLine text="Simulation started" delay={0} type="success" />
                  <TerminalLine text="Validation passed: 18/18 checks" delay={100} type="success" />
                  <TerminalLine text={`Audit entry created: audit/run-${Date.now()}`} delay={200} type="success" />
                  <TerminalLine text="Simulation completed successfully" delay={300} type="success" />
                  <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Exit code: 0
                    </span>
                    <span>Duration: 2.847s</span>
                  </div>
                </div>
              )}
            </div>

            <div id="postSimulation" className="mt-6 flex flex-wrap gap-3">
              {simulationState === "idle" && (
                <Button
                  onClick={handleStartSimulation}
                  className="min-h-[44px] gap-2 relative overflow-hidden group animate-pulse-glow"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Rocket className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span className="relative">Run Simulation</span>
                </Button>
              )}

              {simulationState === "running" && (
                <Button disabled className="min-h-[44px] gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Simulating...
                </Button>
              )}

              {simulationState === "completed" && (
                <>
                  <Button
                    onClick={() => setSimulationState("idle")}
                    variant="secondary"
                    className="min-h-[44px] gap-2 relative overflow-hidden group hover-glow"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">Promote to Production</span>
                  </Button>
                  <Button
                    onClick={handleGenerateCLI}
                    variant="secondary"
                    className="min-h-[44px] gap-2 relative overflow-hidden group hover-glow"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    <span className="relative">Generate CLI Script</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
