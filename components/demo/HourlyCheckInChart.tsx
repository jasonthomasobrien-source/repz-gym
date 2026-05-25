'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface HourlyChartProps {
  data: Array<{ hour: string; count: number }>;
}

export function HourlyCheckInChart({ data }: HourlyChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="rgb(38 38 38)" vertical={false} />
          <XAxis
            dataKey="hour"
            stroke="rgb(168 168 168)"
            tick={{ fontSize: 11 }}
            axisLine={{ stroke: 'rgb(38 38 38)' }}
            tickLine={false}
          />
          <YAxis
            stroke="rgb(168 168 168)"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: 'rgb(38 38 38)' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgb(20 20 20)', border: '1px solid rgb(38 38 38)', borderRadius: '6px', color: 'rgb(255 255 255)' }}
            cursor={{ fill: 'rgb(31 31 31)' }}
            formatter={(value) => [`${value} check-ins`, '']}
          />
          <Bar dataKey="count" fill="rgb(242 101 34)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
