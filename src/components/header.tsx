import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled ? "border-border bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5" : "border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
            <span className="absolute inset-0 rounded-lg bg-primary/50 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative font-mono text-sm font-bold text-primary-foreground">FD</span>
          </div>
          <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            FormatDisc
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {[
            { href: "#governance", label: "Governance" },
            { href: "#demo", label: "Demo" },
            { href: "/one-cli", label: "ONE CLI" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex relative overflow-hidden group" asChild>
            <Link href="/one-cli">
              <span className="relative z-10">Docs</span>
              <span className="absolute inset-0 bg-primary/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
          </Button>
          <Button size="sm" className="relative overflow-hidden group animate-pulse-glow" asChild>
            <Link href="/demo">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Get Started</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
