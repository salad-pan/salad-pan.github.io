"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface BibTexSectionProps {
  citation: string
}

export function BibTexSection({ citation }: BibTexSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(citation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mx-auto max-w-3xl py-12">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        BibTeX
      </h2>
      <div className="relative rounded-lg border border-border bg-muted/30">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Copy BibTeX"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <pre className="overflow-x-auto p-5 pr-12 font-mono text-sm text-muted-foreground">
          {citation}
        </pre>
      </div>
    </section>
  )
}
