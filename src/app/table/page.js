"use client";

import LabTable from "@/components/LabTable";
import { useRouter } from "next/navigation";
import React from "react";

export default function AllTable() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-[90vh]">

      {[1, 2, 3, 4, 5].map((tableId) => (
        <div key={tableId} className="mb-10">

          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white flex flex-row items-center justify-between w-full border-b">
            <h1 className="text-3xl font-bold p-4">
              Table {tableId}
            </h1>

            <button
              onClick={() => router.push(`/table/${tableId}`)}
              className="mr-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Go to Table {tableId}
            </button>
          </div>

          {/* Table Content */}
          <div className="p-4">
            <LabTable table_name={`TABLE${tableId}`} />
          </div>

        </div>
      ))}

    </div>
  );
}
