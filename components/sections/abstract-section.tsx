"use client"

import { LatexText } from "@/components/ui/latex-text"

interface AbstractSectionProps {
  content: string
  keywords?: string[]
}

export function AbstractSection({ content, keywords }: AbstractSectionProps) {
  return (
    <section className="mx-auto max-w-3xl py-12">
      {/* KaTeX CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        crossOrigin="anonymous"
      />

      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        Abstract
      </h2>
      <div className="text-base leading-relaxed text-muted-foreground text-justify">
        <LatexText content={content} />
      </div>
      {keywords && keywords.length > 0 && (
        <div className="mt-6">
          <span className="text-sm font-medium text-foreground">Keywords: </span>
          <span className="text-sm text-muted-foreground">
            {keywords.join(", ")}
          </span>
        </div>
      )}
    </section>
  )
}
