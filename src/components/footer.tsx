import Link from "next/link"
import { useEffect, useState } from "react"

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <footer className="relative border-t border-border bg-card/50 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute -right-20 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-float-delayed" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f3a_1px,transparent_1px),linear-gradient(to_bottom,#1f1f3a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-primary/40">
              <span className="absolute inset-0 rounded-lg bg-primary blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
              <span className="relative font-mono text-sm font-bold text-primary-foreground">FD</span>
            </div>
            <span className="text-lg font-semibold text-foreground transition-all duration-300 group-hover:text-primary group-hover:tracking-wide">
              FormatDisc
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            {[
              { href: "#governance", label: "Governance" },
              { href: "#demo", label: "Demo" },
              { href: "/one-cli", label: "ONE CLI" },
            ].map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-muted-foreground transition-all duration-300 hover:text-foreground group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 group-hover:w-full" />
                <span className="absolute inset-0 -z-10 rounded bg-primary/0 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110" />
              </Link>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground group">
            <span className="transition-all duration-300 group-hover:text-foreground">
              © {new Date().getFullYear()}{" "}
            </span>
            <span className="gradient-text-animated font-medium">FormatDisc</span>
            <span className="transition-all duration-300 group-hover:text-foreground">. All rights reserved.</span>
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative h-px w-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-glow-line" />
          </div>
        </div>
      </div>
    </footer>
  )
}
