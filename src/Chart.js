import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function Chart({ data }) {
  const setAxisRange = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return { min: null, max: null };
    }

    const closeValues = data.map(item => item.close);
    const min = parseFloat((Math.min(...closeValues) * 0.99).toFixed(2))
    const max = parseFloat((Math.max(...closeValues) * 1.01).toFixed(2))
    return [min, max]
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={setAxisRange} />
        <Tooltip />
        <Legend />
        <Line dataKey="close" fill="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
