import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function OverallWalletChart() {
  const data = Array.from({ length: 40 }, (_, i) => ({
    date: `Apr ${i + 1}`,
    balance: Math.floor(Math.random() * 100) + 20,
  }));

  return (
    <div className="bg-neutral-900 rounded-xl shadow-md">

      {/* Compact Header */}
      <div className="border-b border-neutral-800 px-4 pt-3 pb-3">
        <h2 className="text-neutral-400 font-semibold text-sm">
          Overall Wallet Chart
        </h2>
        <p className="text-xs text-neutral-500">
          Wallet balance over time
        </p>
      </div>

      {/* Reduced Chart Height */}
      <div className="h-40 px-3 pb-3">
        <ResponsiveContainer width="100%" height="130%">
          <BarChart data={data} barCategoryGap={1}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#666", fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "none",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="balance"
              fill="#10b981"
              radius={[2, 2, 0, 0]}
              barSize={3}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OverallWalletChart;
