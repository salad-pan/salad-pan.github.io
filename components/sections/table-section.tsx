"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TableCell {
  content: string
  isLatex?: boolean
  isBold?: boolean
  isUnderline?: boolean
}

interface ColumnGroup {
  label: string
  colspan: number
}

interface TableData {
  name: string
  caption: string
  columnGroups?: ColumnGroup[]
  headers: (string | TableCell)[]
  rows: (string | number | TableCell)[][]
  separatorAfterRows?: number[] // Row indices after which to add a separator line
}

interface TableSectionProps {
  title: string
  tables: TableData[]
  note?: string
}

// Simple LaTeX renderer using KaTeX
function LatexRenderer({ content }: { content: string }) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
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

  const content = cell.isLatex ? (
    <LatexRenderer content={cell.content} />
  ) : (
    cell.content
  )

  return (
    <span
      className={cn(
        cell.isBold && "font-bold text-foreground",
        cell.isUnderline && "underline decoration-foreground underline-offset-2"
      )}
    >
      {content}
    </span>
  )
}

function SingleTable({ table }: { table: TableData }) {
  const separatorSet = new Set(table.separatorAfterRows || [])

  return (
    <div className="mb-8 last:mb-0">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm" style={{ tableLayout: "fixed" }}>
          {/* Column Groups Header */}
          {table.columnGroups && (
            <thead>
              <tr className="border-b border-foreground/30">
                {table.columnGroups.map((group, index) => (
                  <th
                    key={index}
                    colSpan={group.colspan}
                    className={cn(
                      "px-3 py-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground",
                      index > 0 && "border-l border-border"
                    )}
                  >
                    {group.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          {/* Main Headers */}
          <thead>
            <tr className="border-b-2 border-foreground">
              {table.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-3 py-2 text-center text-xs font-medium text-foreground"
                >
                  <CellContent cell={header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === table.rows.length - 1
              const hasSeparatorAfter = separatorSet.has(rowIndex)

              return (
                <tr
                  key={rowIndex}
                  className={cn(
                    "transition-colors hover:bg-muted/20",
                    hasSeparatorAfter && "border-b border-foreground/30",
                    isLastRow && "bg-primary/5 font-medium"
                  )}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-3 py-2 text-center text-muted-foreground",
                        cellIndex === 0 && "text-left font-medium",
                        cellIndex === 1 && "text-center text-xs"
                      )}
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
      {table.caption && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          <span className="italic">{table.caption}</span>
        </p>
      )}
    </div>
  )
}

export function TableSection({ title, tables, note }: TableSectionProps) {
  const [activeTable, setActiveTable] = useState(0)

  return (
    <section className="mx-auto max-w-5xl py-12">
      {/* KaTeX CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        crossOrigin="anonymous"
      />

      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>

      {/* Table Tabs */}
      {tables.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {tables.map((table, index) => (
            <button
              key={table.name}
              onClick={() => setActiveTable(index)}
              className={cn(
                "rounded border px-4 py-2 text-sm font-medium transition-all",
                index === activeTable
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {table.name}
            </button>
          ))}
        </div>
      )}

      {/* Active Table */}
      <div className="rounded-lg border border-border bg-card p-4">
        <SingleTable table={tables[activeTable]} />
      </div>

      {/* Note */}
      {note && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {note}
        </p>
      )}
    </section>
  )
}
