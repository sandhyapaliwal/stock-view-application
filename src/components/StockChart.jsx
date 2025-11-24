// Importing required components from 'recharts' library to build the chart
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

/*
 * StockChart component
 * Input: chartData (array of stock price objects with open, close, date)
 * Output: Displays a responsive line chart with open and close prices
 */
export default function StockChart({ chartData }) {
  // If no chart data is available, show a fallback message
  if (!chartData.length) return <div className="text-center text-red-600">No chart data available</div>;

  return (
    // ResponsiveContainer makes sure the chart adjusts to the parent container's size
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        {/* Adds a background grid with dashed lines */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-axis is mapped to the "date" field from chartData */}
        <XAxis dataKey="date" />

        {/* Y-axis auto scales based on data */}
        <YAxis />

        {/* Tooltip shows open,close pricesof that day when hovering over a point */}
        <Tooltip />

        {/* Legend Explains which color represents the open and close prices.*/}
        <Legend />

        {/* Line for "close" price with purple color */}
        <Line type="monotone" dataKey="close" stroke="#8884d8" />

        {/* Line for "open" price with green color */}
        <Line type="monotone" dataKey="open" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
