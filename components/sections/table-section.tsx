"use client"

import { useEffect, useRef } from "react"

interface TableCell {
  content: string
  isLatex?: boolean
  isBold?: boolean
}

interface TableSectionProps {
  title: string
  caption?: string
  headers: (string | TableCell)[]
  rows: (string | number | TableCell)[][]
  highlightLastRow?: boolean
}

// Simple LaTeX renderer using KaTeX
function LatexRenderer({ content }: { content: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      // Load KaTeX dynamically
      const loadKatex = async () => {
        const katex = await import("katex")
        if (containerRef.current) {
          katex.default.render(content, containerRef.current, {
            throwOnError: false,
            displayMode: false,
          })
        }
      }
      loadKatex()
    }
  }, [content])

  return <span ref={containerRef} className="inline-block" />
}

function CellContent({ cell }: { cell: string | number | TableCell }) {
  if (typeof cell === "string" || typeof cell === "number") {
    return <>{cell}</>
  }

  if (cell.isLatex) {
    return (
      <span className={cell.isBold ? "font-semibold" : ""}>
        <LatexRenderer content={cell.content} />
      </span>
    )
  }

  return (
    <span className={cell.isBold ? "font-semibold text-foreground" : ""}>
      {cell.content}
    </span>
  )
}

export function TableSection({
  title,
  caption,
  headers,
  rows,
  highlightLastRow = true,
}: TableSectionProps) {
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
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-foreground/20 bg-muted/30">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left font-medium text-foreground"
                >
                  <CellContent cell={header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1
              const shouldHighlight = highlightLastRow && isLastRow

              return (
                <tr
                  key={rowIndex}
                  className={`
                    border-b border-border last:border-b-0 transition-colors
                    ${shouldHighlight 
                      ? "bg-primary/5 hover:bg-primary/10" 
                      : "hover:bg-muted/30"
                    }
                  `}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`
                        px-4 py-3
                        ${shouldHighlight 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground"
                        }
                        ${cellIndex === 0 ? "font-medium" : ""}
                      `}
                    >
                      <CellContent cell={cell} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm italic text-muted-foreground">
          {caption}
        </p>
      )}
    </section>
  )
}
