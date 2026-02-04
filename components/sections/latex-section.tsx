"use client"

interface LatexSectionProps {
  title: string
  formulas: {
    label?: string
    latex: string
    description?: string
  }[]
}

export function LatexSection({ title, formulas }: LatexSectionProps) {
  return (
    <section className="mx-auto max-w-3xl py-12">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="space-y-8">
        {formulas.map((formula, index) => (
          <div key={index} className="rounded-lg border border-border bg-card p-6">
            {formula.label && (
              <p className="mb-2 text-sm font-medium text-foreground">
                {formula.label}
              </p>
            )}
            <div className="overflow-x-auto py-4 text-center font-mono text-lg">
              {formula.latex}
            </div>
            {formula.description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {formula.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
