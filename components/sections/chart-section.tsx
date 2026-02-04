"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ChartData {
  name: string
  [key: string]: string | number
}

interface ChartSectionProps {
  title: string
  caption?: string
  data: ChartData[]
  dataKeys: {
    key: string
    color: string
    name: string
  }[]
}

export function ChartSection({
  title,
  caption,
  data,
  dataKeys,
}: ChartSectionProps) {
  return (
    <section className="mx-auto max-w-4xl py-12">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="rounded-lg border border-border bg-card p-6">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
            />
            {dataKeys.map((dk) => (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                fill={dk.color}
                name={dk.name}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </p>
      )}
    </section>
  )
}
