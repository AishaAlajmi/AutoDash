import React from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const sales = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 210 },
  { month: "Mar", value: 160 },
  { month: "Apr", value: 250 },
  { month: "May", value: 300 },
  { month: "Jun", value: 280 },
];

const categories = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
  { name: "D", value: 200 },
];

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Line Chart Card */}
      <div className="rounded-2xl shadow p-4 bg-white">
        <h3 className="font-semibold mb-2">Monthly Sales</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="rounded-2xl shadow p-4 bg-white">
        <h3 className="font-semibold mb-2">Sales (Bar)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart Card */}
      <div className="rounded-2xl shadow p-4 bg-white">
        <h3 className="font-semibold mb-2">Category Split</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categories} dataKey="value" nameKey="name" outerRadius={90} label>
                {categories.map((_, i) => (
                  <Cell key={i} fill={["#8884d8","#82ca9d","#ffc658","#8dd1e1"][i % 4]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
