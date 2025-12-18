"use client";

import {
  FaDesktop,
  FaMicrochip,
  FaExclamationTriangle,
  FaTools,
} from "react-icons/fa";
import StatCard from "@/components/StatCard";

export default function Dashboard() {
  // 🔹 Temporary mock data (replace with API later)
  const stats = {
    totalTables: 5,
    totalPCs: 20,
    totalComponents: 80,
    faultyComponents: 7,
  };

  const tableSummary = [
    { table: "TABLE1", ok: 3, faulty: 1 },
    { table: "TABLE2", ok: 4, faulty: 0 },
    { table: "TABLE3", ok: 2, faulty: 2 },
    { table: "TABLE4", ok: 4, faulty: 0 },
    { table: "TABLE5", ok: 3, faulty: 1 },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* Page Title */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* 🔹 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<FaDesktop />}
          label="Total PCs"
          value={stats.totalPCs}
          color="bg-blue-600"
        />
        <StatCard
          icon={<FaMicrochip />}
          label="Total Components"
          value={stats.totalComponents}
          color="bg-green-600"
        />
        <StatCard
          icon={<FaExclamationTriangle />}
          label="Faulty Components"
          value={stats.faultyComponents}
          color="bg-red-600"
        />
        <StatCard
          icon={<FaTools />}
          label="Tables"
          value={stats.totalTables}
          color="bg-purple-600"
        />
      </div>

      {/* 🔹 Table-wise Health */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Table-wise PC Status
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Table</th>
              <th className="text-left p-2 text-green-600">Working PCs</th>
              <th className="text-left p-2 text-red-600">Faulty PCs</th>
            </tr>
          </thead>
          <tbody>
            {tableSummary.map((row) => (
              <tr key={row.table} className="border-b">
                <td className="p-2 font-semibold">{row.table}</td>
                <td className="p-2">{row.ok}</td>
                <td className="p-2">{row.faulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* 🔹 Reusable Stat Card */

