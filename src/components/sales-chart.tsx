"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Mar", value: 36500 },
  { name: "Apr", value: 28000 },
  { name: "May", value: 26700 },
  { name: "Jun", value: 35180 },
  { name: "Jul", value: 44100 },
  { name: "Aug", value: 46000 },
  { name: "Sep", value: 47800 },
  { name: "Oct", value: 49500 },
  { name: "Nov", value: 52100 },
  { name: "Dec", value: 55300 },
  { name: "Jan", value: 60200 },
  { name: "Feb", value: 68450 },
];

export function SalesChart() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--primary))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="value"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
