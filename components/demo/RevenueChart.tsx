'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Legend } from 'recharts';

interface MonthBar {
  month: string;
  membership?: number;
  daypass?: number;
}

interface RevenueChartProps {
  data: MonthBar[];
  stacked?: boolean;
}

export function RevenueChart({ data, stacked = false }: RevenueChartProps) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="rgb(38 38 38)" vertical={false} />
          <XAxis dataKey="month" stroke="rgb(168 168 168)" tick={{ fontSize: 12 }} axisLine={{ stroke: 'rgb(38 38 38)' }} tickLine={false} />
          <YAxis stroke="rgb(168 168 168)" tick={{ fontSize: 12 }} axisLine={{ stroke: 'rgb(38 38 38)' }} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgb(20 20 20)', border: '1px solid rgb(38 38 38)', borderRadius: '6px', color: 'rgb(255 255 255)' }}
            cursor={{ fill: 'rgb(31 31 31)' }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
          />
          {stacked && <Legend wrapperStyle={{ fontSize: 12, color: 'rgb(168 168 168)' }} />}
          <Bar dataKey="membership" name="Memberships" stackId={stacked ? 'a' : undefined} fill="rgb(242 101 34)" radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]} />
          {stacked && <Bar dataKey="daypass" name="Day Passes" stackId="a" fill="rgb(32 178 170)" radius={[4, 4, 0, 0]} />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface GrowthChartProps {
  data: Array<{ month: string; count: number }>;
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="rgb(38 38 38)" vertical={false} />
          <XAxis dataKey="month" stroke="rgb(168 168 168)" tick={{ fontSize: 12 }} axisLine={{ stroke: 'rgb(38 38 38)' }} tickLine={false} />
          <YAxis stroke="rgb(168 168 168)" tick={{ fontSize: 12 }} axisLine={{ stroke: 'rgb(38 38 38)' }} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgb(20 20 20)', border: '1px solid rgb(38 38 38)', borderRadius: '6px', color: 'rgb(255 255 255)' }}
            cursor={{ stroke: 'rgb(38 38 38)' }}
          />
          <Line type="monotone" dataKey="count" stroke="rgb(32 178 170)" strokeWidth={3} dot={{ fill: 'rgb(32 178 170)', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
