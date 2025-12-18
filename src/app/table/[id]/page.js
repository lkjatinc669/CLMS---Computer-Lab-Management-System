"use client";

import LabTable from "@/components/LabTable";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TablePage() {
  const params = useParams();
  const router = useRouter();
  const tableId = Number(params.id);

  // 🔁 Auto redirect if invalid table id
  const [tableValue, setTableValue] = useState(true);
  useEffect(() => {
    if (isNaN(tableId) || tableId < 0 || tableId > 5) {
      router.replace("/table/1");
    }

    if (tableId == 0) {
      setTableValue(false)
    } else {
      setTableValue(true)
    }
  }, [tableId, router]);


  // While redirecting, render nothing
  if (isNaN(tableId) || tableId < 0 || tableId > 5) {
    return null;
  }

  const tableName = `TABLE${tableId}`;

  return (
    <>


      {!tableValue && (
        <div className="flex flex-col h-[90vh]">

          {[1, 2, 3, 4, 5].map((tableId) => (
            <div key={tableId} className="mb-10">

              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white flex flex-row items-center justify-between flex-1 w-full">
                <h1 className="text-3xl font-bold p-4">
                  Table {tableId}
                </h1>

                <button
                  onClick={() => router.push(`/table/${id}`)}
                  className="p-4 bg-blue-600 text-white py-2 rounded-lg font-semibold"
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
      )}



      {tableValue && <div className="flex flex-col w-100% h-90vh justify-center items-center">
        {/* Main Content */}
        <div className="flex flex-row items-center justify-between flex-1 p-6 w-full">
          <h1 className="text-3xl font-bold">
            Table {tableId}
          </h1>

          <div className="w-fit rounded">
            <div className="flex justify-center gap-4 p-3">
              {[1, 2, 3, 4, 5].map((id) => (
                <button
                  key={id}
                  onClick={() => router.push(`/table/${id}`)}
                  className={`px-4 py-2 rounded-lg font-semibold transition
                ${id === tableId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  Table {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-2">
          <LabTable table_name={tableName} />
        </div>

      </div>
      }

    </>
  );
}
