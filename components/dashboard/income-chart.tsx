"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { week: "Week 1", income: 8500, target: 10000 },
  { week: "Week 2", income: 12000, target: 10000 },
  { week: "Week 3", income: 7200, target: 10000 },
  { week: "Week 4", income: 14800, target: 10000 },
  { week: "Week 5", income: 9600, target: 10000 },
  { week: "Week 6", income: 16200, target: 10000 },
]

export function IncomeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
        <YAxis stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: `1px solid var(--color-border)`,
            borderRadius: "8px",
          }}
          formatter={(value) => `₹${value.toLocaleString()}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="var(--color-success)"
          strokeWidth={2}
          dot={{ fill: "var(--color-success)", r: 4 }}
          name="Actual Income"
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="var(--color-muted-foreground)"
          strokeWidth={1}
          strokeDasharray="5 5"
          dot={false}
          name="Target"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
