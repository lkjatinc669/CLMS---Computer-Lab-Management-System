"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaDesktop,
  FaTools,
  FaClipboardList,
  FaBars,
} from "react-icons/fa";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <span className="text-xl font-bold">CLMS</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem
          href="/"
          icon={<FaHome />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarItem
          href="/table"
          icon={<FaDesktop />}
          label="PC Management"
          collapsed={collapsed}
        />
        <SidebarItem
          href="/maintenance"
          icon={<FaTools />}
          label="Maintenance"
          collapsed={collapsed}
        />
        <SidebarItem
          href="/reports"
          icon={<FaClipboardList />}
          label="Reports"
          collapsed={collapsed}
        />
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          Computer Lab System
        </div>
      )}
    </aside>
  );
}

function SidebarItem({ href, icon, label, collapsed }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition relative"
    >
      <span className="text-lg">{icon}</span>

      {!collapsed && <span>{label}</span>}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {label}
        </span>
      )}
    </Link>
  );
}
