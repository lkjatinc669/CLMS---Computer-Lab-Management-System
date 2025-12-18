"use client";

import { useEffect, useState } from "react";
import {
    FaDesktop,
    FaMicrochip,
    FaExclamationTriangle,
    FaTools,
} from "react-icons/fa";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) {
        return <div className="p-6">Loading dashboard...</div>;
    }

    return (
        <div className="p-6 space-y-6">

            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    icon={<FaDesktop />}
                    label="Total PCs"
                    value={data.totalPCs}
                    color="bg-blue-600"
                />
                <StatCard
                    icon={<FaMicrochip />}
                    label="Total Components"
                    value={data.totalComponents}
                    color="bg-green-600"
                />
                <StatCard
                    icon={<FaExclamationTriangle />}
                    label="Faulty Components"
                    value={data.faultyComponents}
                    color="bg-red-600"
                />
                <StatCard
                    icon={<FaTools />}
                    label="Tables"
                    value={data.totalTables}
                    color="bg-purple-600"
                />
            </div>

            {/* Faulty PCs */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold">
                    PCs with Issues: {data.faultyPCs}
                </h2>
            </div>

            {/* Table-wise Faults */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-2">
                    Table-wise Faults
                </h2>

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Table</th>
                            <th className="p-2 border">Faulty Components</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tableStats.map((row) => (
                            <tr key={row.table_name}>
                                <td className="p-2 border">{row.table_name}</td>
                                <td className="p-2 border text-center">{row.faults}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white shadow rounded p-4 text-center">
            <div className="text-gray-500">{title}</div>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}
