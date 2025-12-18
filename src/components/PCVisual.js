"use client";

import { useEffect, useState } from "react";
import StatusItem from "./StatusItem";
import {
  FaDesktop,
  FaMicrochip,
  FaTv,
  FaKeyboard,
  FaMouse,
} from "react-icons/fa";

const COMPONENT_ICON_MAP = {
  CPU: FaMicrochip,
  MONITOR: FaTv,
  KEYBOARD: FaKeyboard,
  MOUSE: FaMouse,
};

export default function PCVisual({ tableName, pcName }) {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedComponents, setEditedComponents] = useState([]);

  // Fetch current status
  useEffect(() => {
    if (!tableName || !pcName) return;

    async function fetchComponentStatus() {
      try {
        const res = await fetch(
          `/api/pc-status?table=${tableName}&pc=${pcName}`
        );
        const data = await res.json();
        setComponents(data.components || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchComponentStatus();
  }, [tableName, pcName]);

  // Open edit form
  const openEdit = () => {
    setEditedComponents(
      components.map((c) => ({ ...c })) // shallow copy for editing
    );
    setEditMode(true);
  };

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updated = [...editedComponents];
    updated[index][field] = value;
    setEditedComponents(updated);
  };

  // Submit update
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/pc-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableName,
          pcName,
          components: editedComponents,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setComponents(editedComponents);
        setEditMode(false);
      } else {
        alert("Update failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div
      className="border rounded-xl shadow-sm bg-white p-4 cursor-pointer hover:shadow-md w-full h-full"
      onClick={openEdit} // double click to edit
    >
      <h1 className="text-center text-2xl font-semibold mb-4">
        {pcName}
      </h1>

      <div className="flex items-center justify-center gap-10">
        {/* LEFT: Big Computer Icon */}
        <div className="text-blue-600">
          <FaDesktop className="text-9xl" />
        </div>

        {/* RIGHT: Component Icons */}
        <div className="grid grid-cols-2 gap-6">
          {loading && <p className="text-sm">Loading...</p>}
          {!loading &&
            components.map((component, i) => {
              const Icon = COMPONENT_ICON_MAP[component.components_name];
              return (
                <StatusItem
                  key={component.components_name}
                  icon={Icon}
                  label={component.components_name}
                  status={component.working}
                  availability={component.avalibility}
                />
              );
            })}
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Components</h2>

            {editMode && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setEditMode(false)} // click outside closes modal
              >
                <div
                  className="bg-white p-6 rounded shadow-lg w-96"
                  onClick={(e) => e.stopPropagation()} // stop inner clicks
                >
                  <h2 className="text-xl font-bold mb-4">Update Components</h2>

                  {editedComponents.map((comp, i) => (
                    <div key={comp.components_name} className="mb-4">
                      <div className="font-semibold mb-1">{comp.components_name}</div>

                      {/* Working Checkbox */}
                      <label className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={comp.working === "Working"}
                          onChange={(e) =>
                            handleChange(i, "working", e.target.checked ? "Working" : "Not Working")
                          }
                        />
                        Working
                      </label>

                      {/* Availability Checkbox */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={comp.avalibility === "Available"}
                          onChange={(e) =>
                            handleChange(i, "avalibility", e.target.checked ? "Available" : "Not Available")
                          }
                        />
                        Available
                      </label>
                    </div>
                  ))}

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="px-3 py-1 bg-gray-300 rounded"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
