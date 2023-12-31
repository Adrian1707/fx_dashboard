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

    const closeValues = data.filter(item => item.rate !== null).map(item => item.rate);
    const min = parseFloat((Math.min(...closeValues) * 0.99).toFixed(2))
    const max = parseFloat((Math.max(...closeValues) * 1.01).toFixed(2))
    if(min < 10) {
      return [min, max]
    } else {
      return [Math.round(min), Math.round(max)]
    }
  }

  const setLineColour = () => {
    const startValue = data[0].rate
    const endValue = data[data.length - 1].rate
    if(startValue >= endValue) {
      return 'red'
    } else {
      return 'green'
    }
  }

  const setTitleColour = () => {
    const startValue = data[0].rate
    const endValue = data[data.length - 1].rate
    if(startValue >= endValue) {
      return 'text-red-600'
    } else {
      return 'text-green-600'
    }
  }

  return (
    <div>
      <h1 className={`text-xl font-bold text-center ${setTitleColour()}`}>{data[0].name}</h1>
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
          <XAxis dataKey="day" />
          <YAxis domain={setAxisRange} />
          <Tooltip />
          <Legend />
          <Line type="monotone" stroke={setLineColour()} dataKey="rate" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
