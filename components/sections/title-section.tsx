"use client"

import React from "react"

import Link from "next/link"
import { Github, FileText, Database, Video } from "lucide-react"

interface Author {
  name: string
  affiliation: number
  link?: string
  isCorresponding?: boolean
}

interface TitleSectionProps {
  title: string
  authors: Author[]
  affiliations: string[]
  venue?: string
  links?: {
    paper?: string
    arxiv?: string
    code?: string
    data?: string
    video?: string
  }
}

export function TitleSection({
  title,
  authors,
  affiliations,
  venue,
  links,
}: TitleSectionProps) {
  return (
    <section className="py-16 text-center md:py-24">
      <h1 className="mx-auto max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
        {title}
      </h1>

      {/* Authors */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {authors.map((author, index) => (
          <span key={index} className="text-base text-foreground">
            {author.link ? (
              <Link
                href={author.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
            <sup className="ml-0.5 text-xs text-muted-foreground">
              {author.affiliation}
              {author.isCorresponding && "*"}
            </sup>
            {index < authors.length - 1 && ","}
          </span>
        ))}
      </div>

      {/* Affiliations */}
      <div className="mx-auto mt-4 max-w-2xl space-y-1">
        {affiliations.map((affiliation, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            <sup className="mr-1">{index + 1}</sup>
            {affiliation}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">* Corresponding author</p>
      </div>

      {/* Venue */}
      {venue && (
        <p className="mt-6 text-sm font-medium text-muted-foreground">
          {venue}
        </p>
      )}

      {/* Links */}
      {links && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {links.paper && (
            <LinkButton href={links.paper} icon={<FileText className="h-4 w-4" />}>
              Paper
            </LinkButton>
          )}
          {links.arxiv && (
            <LinkButton href={links.arxiv} icon={<FileText className="h-4 w-4" />}>
              arXiv
            </LinkButton>
          )}
          {links.code && (
            <LinkButton href={links.code} icon={<Github className="h-4 w-4" />}>
              Code
            </LinkButton>
          )}
          {links.data && (
            <LinkButton href={links.data} icon={<Database className="h-4 w-4" />}>
              Dataset
            </LinkButton>
          )}
          {links.video && (
            <LinkButton href={links.video} icon={<Video className="h-4 w-4" />}>
              Video
            </LinkButton>
          )}
        </div>
      )}
    </section>
  )
}

function LinkButton({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {icon}
      {children}
    </Link>
  )
}
