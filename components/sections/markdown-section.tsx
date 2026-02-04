"use client"

import React from "react"
import Image from "next/image"
import { LatexText } from "@/components/ui/latex-text"

interface FigureProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface MarkdownSectionProps {
  title: string
  content: string | React.ReactNode
  figure?: FigureProps
}

export function MarkdownSection({ title, content, figure }: MarkdownSectionProps) {
  return (
    <section className="mx-auto max-w-4xl py-12">
      {/* KaTeX CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        crossOrigin="anonymous"
      />

      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="prose prose-neutral max-w-none text-muted-foreground">
        {typeof content === "string" ? (
          <div className="leading-relaxed text-justify">
            <LatexText content={content} />
          </div>
        ) : (
          content
        )}
      </div>

      {figure && (
        <figure className="mt-8">
          <div className="overflow-hidden rounded border border-border bg-secondary/30">
            <Image
              src={figure.src || "/placeholder.svg"}
              alt={figure.alt}
              width={figure.width || 1200}
              height={figure.height || 600}
              className="h-auto w-full object-contain"
            />
          </div>
          {figure.caption && (
            <figcaption className="mt-3 text-left text-sm text-muted-foreground">
              <LatexText content={figure.caption} />
            </figcaption>
          )}
        </figure>
      )}
    </section>
  )
}
