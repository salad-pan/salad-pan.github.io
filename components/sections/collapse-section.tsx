"use client"

import React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapseItem {
  title: string
  content: string | React.ReactNode
}

interface CollapseSectionProps {
  title: string
  items: CollapseItem[]
}

export function CollapseSection({ title, items }: CollapseSectionProps) {
  return (
    <section className="mx-auto max-w-3xl py-12">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <CollapseItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

function CollapseItem({ item }: { item: CollapseItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/30"
      >
        <span className="font-medium text-foreground">{item.title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-5 py-4 text-muted-foreground">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  )
}
