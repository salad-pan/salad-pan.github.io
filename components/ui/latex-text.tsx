"use client"

import { useEffect, useRef, useCallback } from "react"

interface LatexTextProps {
  content: string
  className?: string
  displayMode?: boolean
}

/**
 * Parses text with markdown-like formatting for bold and italic
 * Supports: ***text*** (bold+italic), **text** (bold), *text* (italic)
 */
function parseTextFormatting(text: string, container: HTMLElement) {
  // Pattern: ***bold+italic***, **bold**, *italic*
  const pattern = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g
  const parts = text.split(pattern)

  for (const part of parts) {
    if (part.startsWith("***") && part.endsWith("***")) {
      // Bold + Italic
      const span = document.createElement("span")
      span.className = "font-semibold italic"
      span.textContent = part.slice(3, -3)
      container.appendChild(span)
    } else if (part.startsWith("**") && part.endsWith("**")) {
      // Bold only
      const span = document.createElement("span")
      span.className = "font-semibold"
      span.textContent = part.slice(2, -2)
      container.appendChild(span)
    } else if (part.startsWith("*") && part.endsWith("*")) {
      // Italic only
      const span = document.createElement("span")
      span.className = "italic"
      span.textContent = part.slice(1, -1)
      container.appendChild(span)
    } else if (part) {
      // Regular text
      const textNode = document.createTextNode(part)
      container.appendChild(textNode)
    }
  }
}

/**
 * Renders text with inline LaTeX support and markdown formatting.
 * LaTeX expressions should be wrapped in $...$ for inline or $$...$$ for display mode.
 * Text formatting: ***bold+italic***, **bold**, *italic*
 */
export function LatexText({ content, className = "" }: { content: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)

  const renderContent = useCallback(async () => {
    if (!containerRef.current || typeof window === "undefined") return

    const katex = await import("katex")
    
    // Match both inline ($...$) and display ($$...$$) LaTeX
    const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/g)
    
    containerRef.current.innerHTML = ""
    
    for (const part of parts) {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        // Display mode LaTeX
        const latex = part.slice(2, -2)
        const span = document.createElement("span")
        span.className = "block my-4"
        try {
          katex.default.render(latex, span, { throwOnError: false, displayMode: true })
        } catch {
          span.textContent = part
        }
        containerRef.current.appendChild(span)
      } else if (part.startsWith("$") && part.endsWith("$")) {
        // Inline LaTeX
        const latex = part.slice(1, -1)
        const span = document.createElement("span")
        span.className = "inline-block align-middle"
        try {
          katex.default.render(latex, span, { throwOnError: false, displayMode: false })
        } catch {
          span.textContent = part
        }
        containerRef.current.appendChild(span)
      } else if (part) {
        // Regular text with markdown formatting
        parseTextFormatting(part, containerRef.current)
      }
    }
  }, [content])

  useEffect(() => {
    renderContent()
  }, [renderContent])

  return <span ref={containerRef} className={className}>{content}</span>
}

/**
 * Simple LaTeX renderer for pure LaTeX content (no text mixing)
 */
export function LatexRenderer({ content, displayMode = false }: LatexTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      const loadKatex = async () => {
        const katex = await import("katex")
        if (containerRef.current) {
          katex.default.render(content, containerRef.current, {
            throwOnError: false,
            displayMode,
          })
        }
      }
      loadKatex()
    }
  }, [content, displayMode])

  return <span ref={containerRef} className="inline-block" />
}
