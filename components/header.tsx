"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Github, Menu, X } from "lucide-react"

const navigation = {
  home: {
    name: "GitHub",
    link: "https://github.com/JJLibra",
  },
  logo: {
    name: "SALAD-Pan",
    link: "#",
  },
  projects: [
    {
      name: "Coming soon ...",
      link: "https://github.com/JJLibra",
    },
  ],
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={navigation.logo.link}
          className="font-serif text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
        >
          {navigation.logo.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={navigation.home.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            <span>{navigation.home.name}</span>
          </Link>

          {/* Projects Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isProjectsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isProjectsOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[160px] rounded-md border border-border bg-card p-1 shadow-lg">
                {navigation.projects.map((project) => (
                  <Link
                    key={project.name}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    onClick={() => setIsProjectsOpen(false)}
                  >
                    {project.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href={navigation.home.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <Github className="h-4 w-4" />
              <span>{navigation.home.name}</span>
            </Link>
            <div className="border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                Projects
              </p>
              {navigation.projects.map((project) => (
                <Link
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
