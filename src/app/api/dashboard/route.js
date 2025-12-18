import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // Total tables (fixed)
    const totalTables = 5;

    // Total PCs
    const totalPCs = db.prepare(`
      SELECT COUNT(DISTINCT table_name || pc_name) AS count
      FROM component_status
    `).get().count;

    // Total components
    const totalComponents = db.prepare(`
      SELECT COUNT(*) AS count FROM component_status
    `).get().count;

    // Faulty components
    const faultyComponents = db.prepare(`
      SELECT COUNT(*) AS count
      FROM component_status
      WHERE working = 'Not Working'
    `).get().count;

    // PCs with issues
    const faultyPCs = db.prepare(`
      SELECT COUNT(DISTINCT table_name || pc_name) AS count
      FROM component_status
      WHERE working = 'Not Working'
    `).get().count;

    // Table-wise fault count
    const tableStats = db.prepare(`
      SELECT table_name, COUNT(*) AS faults
      FROM component_status
      WHERE working = 'Not Working'
      GROUP BY table_name
    `).all();

    return NextResponse.json({
      totalTables,
      totalPCs,
      totalComponents,
      faultyComponents,
      faultyPCs,
      tableStats,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
