"use client"

import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "الوجهات", href: "#destinations" },
  { label: "خدماتنا", href: "#services" },
  { label: "لماذا نحن", href: "#why" },
  { label: "آراء العملاء", href: "#testimonials" },
  { label: "نصائح سياحية", href: "#tips" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[oklch(0.22_0.03_220_/_0.6)] to-[oklch(0.22_0.03_220_/_0.35)] backdrop-blur-sm transition-all duration-300",
        scrolled && "bg-background/90 shadow-sm backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <WaveMark />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-heading text-lg font-extrabold transition-colors",
                scrolled ? "text-foreground" : "text-white",
              )}
            >
              المحيط للسياحة
            </span>
            <span
              className={cn(
                "text-[11px] font-medium tracking-wide transition-colors",
                scrolled ? "text-muted-foreground" : "text-white/80",
              )}
            >
              Almohit Travel & Tours
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-foreground/80 hover:bg-secondary hover:text-primary"
                  : "text-white/90 hover:bg-white/15 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/60166881924"
            className={cn(
              "flex items-center gap-2 text-sm font-semibold transition-colors",
              scrolled ? "text-primary" : "text-white",
            )}
          >
            <Phone className="h-4 w-4" />
            <span dir="ltr">+60 16-688-1924</span>
          </a>
          <Button className="rounded-full bg-accent px-5 font-bold text-accent-foreground hover:bg-accent/90">
            احجز الآن
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden",
            scrolled
              ? "bg-secondary text-foreground"
              : "bg-white/15 text-white backdrop-blur",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button className="mt-3 w-full rounded-full bg-accent font-bold text-accent-foreground hover:bg-accent/90">
            احجز رحلتك الآن
          </Button>
        </div>
      )}
    </header>
  )
}

function WaveMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12c1.5 0 2-1.5 3.5-1.5S7.5 12 9 12s2-1.5 3.5-1.5S14.5 12 16 12s2-1.5 3.5-1.5S21 12 22 12" />
      <path d="M2 17c1.5 0 2-1.5 3.5-1.5S7.5 17 9 17s2-1.5 3.5-1.5S14.5 17 16 17s2-1.5 3.5-1.5S21 17 22 17" />
      <path d="M12 3a4 4 0 0 1 4 4c0 1.5-1 2.5-2 3" />
    </svg>
  )
}
